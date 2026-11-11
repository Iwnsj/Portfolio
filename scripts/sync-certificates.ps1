# Renders crisp JPG previews from every PDF in /certificate into /public/certificates/previews
# and copies the PDFs into /public/certificates/files.
Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing

$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Storage.FileAccessMode, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
})[0]

$asTaskAction = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction'
})[0]

function Await($WinRtTask, $ResultType) {
  $netTask = $asTaskGeneric.MakeGenericMethod($ResultType).Invoke($null, @($WinRtTask))
  $netTask.Wait(-1) | Out-Null
  return $netTask.Result
}

function AwaitAction($WinRtAction) {
  $netTask = $asTaskAction.Invoke($null, @($WinRtAction))
  $netTask.Wait(-1) | Out-Null
}

$jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 88L)

$root = Split-Path -Parent $PSScriptRoot
$srcDir = Join-Path $root 'certificate'
$filesDir = Join-Path $root 'public\certificates\files'
$prevDir = Join-Path $root 'public\certificates\previews'

Remove-Item "$prevDir\*" -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $filesDir | Out-Null
New-Item -ItemType Directory -Force $prevDir | Out-Null

$map = @(
  @{ Src = 'freecodecamp.org_certification_hanschristphervalentino_responsive-web-design-v9.pdf'; Slug = 'freecodecamp-responsive-web-design' },
  @{ Src = 'Cert.pdf'; Slug = 'icpep-regcon-cpp-2nd-runner-up' },
  @{ Src = 'CvalentinoSmu-22456.pdf'; Slug = 'codechum-cpp-programming-1' },
  @{ Src = 'ClassOf2026__issued (1).pdf'; Slug = 'ched-mapua-asu-ai-literacy' },
  @{ Src = 'DAY 1_ CERTIFICATE OF PARTICIPATION_Hans Christopher D. Valentino.pdf'; Slug = 'icpep-day1-mind-over-matter' },
  @{ Src = 'Hans Valentino.pdf'; Slug = 'icpep-talaktech' }
)

foreach ($item in $map) {
  $pdfPath = Join-Path $srcDir $item.Src
  if (-not (Test-Path $pdfPath)) { continue }

  $destPdf = Join-Path $filesDir "$($item.Slug).pdf"
  Copy-Item $pdfPath $destPdf -Force

  $storageFile = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath)) ([Windows.Storage.StorageFile])
  $pdfDoc = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])

  for ($i = 0; $i -lt $pdfDoc.PageCount; $i++) {
    $page = $pdfDoc.GetPage($i)
    $suffix = if ($pdfDoc.PageCount -gt 1) { "-p$($i + 1)" } else { "" }
    $outJpg = Join-Path $prevDir "$($item.Slug)$suffix.jpg"

    $memStream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
    $opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
    $opts.DestinationWidth = 1280
    AwaitAction ($page.RenderToStreamAsync($memStream, $opts))

    $netStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($memStream)
    $img = [System.Drawing.Image]::FromStream($netStream)
    $bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($img, 0, 0, $img.Width, $img.Height)
    $bmp.Save($outJpg, $jpgCodec, $encParams)

    $g.Dispose(); $bmp.Dispose(); $img.Dispose(); $netStream.Dispose(); $memStream.Dispose(); $page.Dispose()
    Write-Host "Rendered $outJpg"
  }
}
