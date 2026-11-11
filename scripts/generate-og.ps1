# Generates public/og-image.png (1200x630) in a crisp 90s OS window aesthetic (zero gradients).
# Re-run after changing your name/role:  powershell -ExecutionPolicy Bypass -File scripts/generate-og.ps1
param(
  [string]$Name = 'YOUR NAME',
  [string]$Role = 'Aspiring Full-Stack Developer',
  [string]$Url  = 'your-domain.com'
)
Add-Type -AssemblyName System.Drawing
$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'None'
$g.TextRenderingHint = 'AntiAliasGridFit'

# Solid 90s palette
$bg      = [System.Drawing.Color]::FromArgb(235, 229, 213)
$surface = [System.Drawing.Color]::FromArgb(252, 250, 242)
$ink     = [System.Drawing.Color]::FromArgb(20, 20, 19)
$navy    = [System.Drawing.Color]::FromArgb(0, 43, 127)
$red     = [System.Drawing.Color]::FromArgb(217, 56, 30)
$yellow  = [System.Drawing.Color]::FromArgb(242, 183, 5)
$teal    = [System.Drawing.Color]::FromArgb(0, 122, 120)

$g.Clear($bg)

# Dot-matrix background grid
$dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 20, 20, 19))
for ($x = 16; $x -lt $w; $x += 32) {
  for ($y = 16; $y -lt $h; $y += 32) {
    $g.FillRectangle($dotBrush, $x, $y, 3, 3)
  }
}

$inkBrush     = New-Object System.Drawing.SolidBrush $ink
$surfaceBrush = New-Object System.Drawing.SolidBrush $surface
$navyBrush    = New-Object System.Drawing.SolidBrush $navy
$redBrush     = New-Object System.Drawing.SolidBrush $red
$yellowBrush  = New-Object System.Drawing.SolidBrush $yellow
$tealBrush    = New-Object System.Drawing.SolidBrush $teal
$whiteBrush   = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$borderPen    = New-Object System.Drawing.Pen $ink, 4

# Hard offset shadow + 90s window frame
$g.FillRectangle($inkBrush, 82, 74, 1050, 496)
$g.FillRectangle($surfaceBrush, 70, 62, 1050, 496)
$g.DrawRectangle($borderPen, 70, 62, 1050, 496)

# Window title bar
$g.FillRectangle($navyBrush, 70, 62, 1050, 52)
$g.DrawRectangle($borderPen, 70, 62, 1050, 52)

# Window controls [_][□][×]
$g.FillRectangle($yellowBrush, 990, 74, 28, 28)
$g.DrawRectangle($borderPen, 990, 74, 28, 28)
$g.FillRectangle($surfaceBrush, 1028, 74, 28, 28)
$g.DrawRectangle($borderPen, 1028, 74, 28, 28)
$g.FillRectangle($redBrush, 1066, 74, 28, 28)
$g.DrawRectangle($borderPen, 1066, 74, 28, 28)

$fontTitle = New-Object System.Drawing.Font 'Consolas', 22, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$fontBig   = New-Object System.Drawing.Font 'Segoe UI', 86, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$fontMid   = New-Object System.Drawing.Font 'Consolas', 34, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
$fontSm    = New-Object System.Drawing.Font 'Consolas', 24, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)

$g.DrawString('PORTFOLIO.EXE — SYSTEM WINDOW', $fontTitle, $whiteBrush, 92, 76)

# Yellow sticker tag
$g.FillRectangle($yellowBrush, 120, 165, 290, 42)
$g.DrawRectangle($borderPen, 120, 165, 290, 42)
$g.DrawString('C:\USERS\PORTFOLIO>', $fontSm, $inkBrush, 134, 173)

# Name with solid offset shadow
$g.DrawString($Name, $fontBig, $yellowBrush, 120, 232)
$g.DrawString($Name, $fontBig, $inkBrush, 114, 226)

# Role
$g.DrawString("> $Role", $fontMid, $tealBrush, 120, 355)

# Solid decorative blocks
$g.FillRectangle($redBrush, 120, 430, 36, 16)
$g.FillRectangle($yellowBrush, 166, 430, 36, 16)
$g.FillRectangle($tealBrush, 212, 430, 36, 16)
$g.FillRectangle($inkBrush, 258, 430, 260, 16)

$g.DrawString($Url, $fontSm, $inkBrush, 120, 480)

$out = Join-Path $PSScriptRoot '..\public\og-image.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
Write-Host "Saved $out"
