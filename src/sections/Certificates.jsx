import { useState } from 'react'
import { ArrowRight, FolderOpen } from 'lucide-react'
import { certificates } from '../data/portfolio'
import Button from '../components/Button'
import CertificateCard from '../components/CertificateCard'
import CertificateModal from '../components/CertificateModal'
import Magnetic from '../components/Magnetic'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

/**
 * Certificates — Main portfolio section displaying the 3 most relevant
 * certificates (`featured: true`) plus a button to open the full Certificates
 * Archive page where visitors can browse all certificates.
 */
export default function Certificates({ onBrowseAll }) {
  const [selected, setSelected] = useState(null)
  const featuredCerts = certificates.filter((c) => c.featured).slice(0, 3)

  return (
    <section id="certificates" aria-labelledby="certificates-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="certificates-title"
          index={4}
          eyebrow="C:\CERTIFICATES\TOP_3.DIR"
          title="Certifications & awards"
          subtitle="Selected credentials in web development, competitive programming and AI literacy. Click any certificate to inspect or open the official PDF."
        />

        {/* 3 Relevant Certificates Grid */}
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCerts.map((cert, i) => (
            <Reveal key={cert.id} as="li" delay={i * 0.08} className="h-full">
              <CertificateCard certificate={cert} index={i} onInspect={setSelected} />
            </Reveal>
          ))}
        </ul>

        {/* 90s Archive Callout Bar → Button to browse all certificates page */}
        <Reveal delay={0.2} className="mt-12">
          <div className="flex flex-col items-center justify-between gap-4 border-2 border-ink bg-surface p-5 retro-shadow sm:flex-row sm:px-7">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <span className="hidden h-11 w-11 shrink-0 place-items-center border-2 border-ink bg-accent-3 text-[#141413] sm:grid">
                <FolderOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs font-bold tracking-wider text-accent uppercase">
                  ARCHIVE_STATUS // SHOWING {featuredCerts.length} OF {certificates.length} CERTIFICATES
                </p>
                <p className="mt-0.5 font-display text-base font-bold text-ink uppercase sm:text-lg">
                  Want to see all my certifications, competitions &amp; engineering webinars?
                </p>
              </div>
            </div>

            <Magnetic>
              <Button
                href="/certificates"
                onClick={(e) => {
                  if (onBrowseAll) {
                    e.preventDefault()
                    onBrowseAll()
                  }
                }}
              >
                BROWSE ALL {certificates.length} CERTIFICATES
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* Lightbox modal for inspecting a certificate */}
      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
