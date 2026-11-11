import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Calendar, ExternalLink, FileText, ShieldCheck, X } from 'lucide-react'

/**
 * CertificateModal — 90s CERT_VIEWER.EXE Lightbox Window (zero gradients).
 * Displays the full-resolution certificate image, metadata, and direct links
 * to open/download the PDF or verify the credential online.
 */
export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [certificate, onClose])

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 p-3 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col border-2 border-ink bg-surface retro-shadow-lg"
          >
            {/* 90s Window Title Bar */}
            <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-win-bar px-3.5 py-2 text-win-bar-text">
              <div className="flex min-w-0 items-center gap-2">
                <span className="inline-block h-3 w-3 shrink-0 border border-current bg-accent-3" />
                <span className="truncate font-mono text-xs font-bold tracking-wider uppercase">
                  CERT_VIEWER.EXE // {certificate.id.toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close certificate preview"
                className="inline-flex items-center gap-1 border-2 border-ink bg-accent-solid px-2.5 py-0.5 font-mono text-xs font-bold text-white uppercase hover:bg-accent"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" /> CLOSE [ESC]
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-4 sm:p-6">
              {/* Full Certificate Image Frame */}
              <div className="border-2 border-ink bg-surface-alt p-2 sm:p-3">
                <img
                  src={certificate.image}
                  alt={`Certificate for ${certificate.title}`}
                  className="mx-auto max-h-[58vh] w-auto border-2 border-ink bg-white object-contain"
                />
              </div>

              {/* Details & Actions */}
              <div className="mt-5 flex flex-col justify-between gap-4 border-t-2 border-ink pt-4 md:flex-row md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold">
                    <span className="inline-flex items-center gap-1 border border-ink bg-accent-3 px-2 py-0.5 text-[#141413] uppercase">
                      {certificate.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-accent uppercase">
                      <Award className="h-4 w-4" aria-hidden="true" /> {certificate.issuer}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> {certificate.date}
                    </span>
                  </div>

                  <h3 id="cert-modal-title" className="mt-2 text-xl font-bold uppercase sm:text-2xl">
                    {certificate.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">{certificate.description}</p>
                  {certificate.credentialId && (
                    <p className="mt-2 font-mono text-xs text-muted">
                      CREDENTIAL_ID: <span className="font-bold text-ink">{certificate.credentialId}</span>
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-3">
                  {certificate.verifyUrl && (
                    <a
                      href={certificate.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-accent-2 px-4 py-2.5 font-mono text-xs font-bold text-white uppercase retro-shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                    >
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" /> VERIFY CREDENTIAL
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {certificate.pdfUrl && (
                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-accent-solid px-4 py-2.5 font-mono text-xs font-bold text-white uppercase retro-shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                    >
                      <FileText className="h-4 w-4" aria-hidden="true" /> OPEN FULL PDF
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
