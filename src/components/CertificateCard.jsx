import { Award, Calendar, ExternalLink, Eye, FileText, ShieldCheck, Star } from 'lucide-react'
import LazyImage from './LazyImage'

/**
 * CertificateCard — 90s OS Document Window Card for a single certificate (zero gradients).
 * Clicking the preview image or the [ INSPECT ] button opens the full-screen
 * CertificateModal; [ PDF ] opens the original PDF file directly.
 */
export default function CertificateCard({ certificate, index = 0, onInspect }) {
  const fileName = `cert_${String(index + 1).padStart(2, '0')}.bmp`
  const headerBar = certificate.featured
    ? 'bg-win-bar text-win-bar-text'
    : 'bg-accent-2 text-white'

  return (
    <article className="group relative flex h-full flex-col border-2 border-ink bg-surface retro-shadow transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_var(--accent)]">
      {/* Classic 90s Window Title Bar */}
      <div
        aria-hidden="true"
        className={`flex items-center justify-between gap-2 border-b-2 border-ink px-3 py-1.5 select-none ${headerBar}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 shrink-0 border border-current bg-accent-3" />
          <span className="truncate font-mono text-xs font-bold tracking-wider uppercase">{fileName}</span>
        </div>
        <div className="mx-1 hidden h-3 flex-1 flex-col justify-between opacity-35 sm:flex">
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="grid h-4 w-4 place-items-center border border-ink bg-surface text-[10px] leading-none font-bold text-ink">
            _
          </span>
          <span className="grid h-4 w-4 place-items-center border border-ink bg-surface text-[10px] leading-none font-bold text-ink">
            □
          </span>
          <span className="grid h-4 w-4 place-items-center border border-ink bg-accent-solid text-[10px] leading-none font-bold text-white">
            ×
          </span>
        </div>
      </div>

      {/* Framed Certificate Preview Image */}
      <div className="relative border-b-2 border-ink bg-surface-alt p-2.5">
        <button
          type="button"
          onClick={() => onInspect?.(certificate)}
          aria-label={`Inspect certificate: ${certificate.title}`}
          className="group/img relative block w-full overflow-hidden border-2 border-ink bg-white text-left focus:outline-none"
        >
          <LazyImage
            src={certificate.image}
            alt={`Certificate for ${certificate.title}`}
            width="640"
            height="450"
            wrapperClassName="aspect-[16/11] bg-surface-alt"
            className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover/img:scale-105"
          />

          {certificate.featured && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 border-2 border-ink bg-accent-3 px-2 py-0.5 font-mono text-[10px] font-bold text-[#141413] uppercase retro-shadow-sm">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> FEATURED
            </span>
          )}

          <span className="absolute top-2 right-2 border-2 border-ink bg-surface px-2 py-0.5 font-mono text-[10px] font-bold text-ink uppercase retro-shadow-sm">
            {certificate.category}
          </span>

          <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 border-2 border-ink bg-accent-solid px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase opacity-0 transition-opacity duration-150 group-hover/img:opacity-100">
            <Eye className="h-3 w-3" aria-hidden="true" /> ZOOM_VIEW
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="inline-flex items-center gap-1 font-bold text-accent uppercase">
            <Award className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{certificate.issuer}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-muted">
            <Calendar className="h-3 w-3" aria-hidden="true" />
            {certificate.date}
          </span>
        </div>

        <h3 className="mt-2.5 text-lg leading-snug font-bold tracking-tight uppercase transition-colors group-hover:text-accent">
          {certificate.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{certificate.description}</p>

        {certificate.tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Certificate topics">
            {certificate.tags.map((tag) => (
              <li
                key={tag}
                className="border border-ink bg-surface-alt px-2 py-0.5 font-mono text-[11px] font-semibold text-ink"
              >
                #{tag}
              </li>
            ))}
          </ul>
        )}

        {/* Action buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t-2 border-ink pt-4">
          <button
            type="button"
            onClick={() => onInspect?.(certificate)}
            className="inline-flex items-center gap-1.5 border-2 border-ink bg-accent-3 px-3 py-1.5 font-mono text-xs font-bold text-[#141413] uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" /> PREVIEW
          </button>

          {certificate.verifyUrl && (
            <a
              href={certificate.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border-2 border-ink bg-surface-alt px-2.5 py-1.5 font-mono text-xs font-bold text-ink uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-accent-2 hover:text-white hover:shadow-none"
            >
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" /> VERIFY
            </a>
          )}

          {certificate.pdfUrl && (
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 border-2 border-ink bg-accent-solid px-3 py-1.5 font-mono text-xs font-bold text-white uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" /> PDF
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
