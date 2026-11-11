import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Award, FolderOpen, Search, X } from 'lucide-react'
import { certificates, personal } from '../data/portfolio'
import Button from '../components/Button'
import CertificateCard from '../components/CertificateCard'
import CertificateModal from '../components/CertificateModal'
import Reveal from '../components/Reveal'
import ThemeToggle from '../components/ThemeToggle'
import Footer from '../sections/Footer'

/**
 * CertificatesPage — Dedicated full-page 90s Archive Explorer where visitors
 * can browse, filter, search, preview and download all certificates.
 */
export default function CertificatesPage({ onBack }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  // Scroll to top when opening the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const categories = useMemo(
    () => ['All', ...new Set(certificates.map((c) => c.category))],
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return certificates.filter((c) => {
      const matchesCategory = category === 'All' || c.category === category
      if (!matchesCategory) return false
      if (!q) return true
      return (
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags?.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [category, query])

  return (
    <div className="min-h-svh flex flex-col">
      {/* Sticky 90s Archive Top Bar */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between border-2 border-ink bg-surface px-3 py-2 retro-shadow sm:px-4">
          <a
            href="/#certificates"
            onClick={(e) => {
              if (onBack) {
                e.preventDefault()
                onBack()
              }
            }}
            className="inline-flex items-center gap-2 border-2 border-ink bg-accent-solid px-3.5 py-1.5 font-mono text-xs font-bold text-white uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>BACK TO PORTFOLIO</span>
          </a>

          <div className="hidden items-center gap-2 font-mono text-xs font-bold text-ink uppercase md:flex">
            <FolderOpen className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>C:\{personal.initials}_PORTFOLIO\CERTIFICATES\ALL_{certificates.length}.DIR</span>
          </div>

          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="flex-1 pt-28 pb-24 sm:pt-32">
        <div className="container-page">
          {/* Archive Header Window */}
          <Reveal>
            <div className="border-2 border-ink bg-surface retro-shadow">
              <div className="flex items-center justify-between border-b-2 border-ink bg-win-bar px-3.5 py-1.5 font-mono text-xs font-bold text-win-bar-text uppercase">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 border border-current bg-accent-3" />
                  <span>CERTIFICATE_ARCHIVE.EXE — {personal.name.toUpperCase()}</span>
                </div>
                <span>[_][□][×]</span>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center sm:p-8">
                <div>
                  <div className="inline-flex items-center gap-1.5 border-2 border-ink bg-accent-3 px-2.5 py-0.5 font-mono text-xs font-bold text-[#141413] uppercase">
                    <Award className="h-3.5 w-3.5" aria-hidden="true" /> OFFICIAL CREDENTIALS ARCHIVE
                  </div>
                  <h1 className="mt-3 text-3xl font-bold tracking-tight uppercase sm:text-5xl">
                    All Certificates &amp; Trainings
                  </h1>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                    Browse all {certificates.length} of my current developer certifications, programming competition
                    awards, micro-credentials and computer engineering seminars. Click any card to inspect the
                    full certificate or open the original PDF.
                  </p>
                </div>

                {/* Quick Archive Counters */}
                <dl className="grid grid-cols-3 gap-2.5">
                  <div className="border-2 border-ink bg-surface-alt p-3 text-center retro-shadow-sm">
                    <dt className="font-mono text-[10px] font-bold text-muted uppercase">TOTAL</dt>
                    <dd className="font-pixel text-3xl leading-none font-bold text-accent sm:text-4xl">
                      {certificates.length}
                    </dd>
                  </div>
                  <div className="border-2 border-ink bg-surface-alt p-3 text-center retro-shadow-sm">
                    <dt className="font-mono text-[10px] font-bold text-muted uppercase">FEATURED</dt>
                    <dd className="font-pixel text-3xl leading-none font-bold text-ink sm:text-4xl">
                      {certificates.filter((c) => c.featured).length}
                    </dd>
                  </div>
                  <div className="border-2 border-ink bg-surface-alt p-3 text-center retro-shadow-sm">
                    <dt className="font-mono text-[10px] font-bold text-muted uppercase">CATEGORIES</dt>
                    <dd className="font-pixel text-3xl leading-none font-bold text-accent-2 sm:text-4xl">
                      {categories.length - 1}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Filter & Search Toolbar */}
          <Reveal delay={0.08} className="mt-8">
            <div className="flex flex-col justify-between gap-4 border-2 border-ink bg-surface-alt p-3 retro-shadow-sm lg:flex-row lg:items-center">
              {/* Category Tabs */}
              <div role="group" aria-label="Filter certificates by category" className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => {
                  const active = category === cat
                  const count =
                    cat === 'All'
                      ? certificates.length
                      : certificates.filter((c) => c.category === cat).length
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategory(cat)}
                      className={`relative px-3.5 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
                        active
                          ? 'text-white'
                          : 'border-2 border-ink bg-surface text-ink hover:bg-accent-3 hover:text-[#141413]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="cert-archive-filter-pill"
                          className="absolute inset-0 border-2 border-ink bg-accent-solid retro-shadow-sm"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                      <span className="relative">
                        [{cat} ({count})]
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH CERTIFICATES..."
                  aria-label="Search certificates"
                  className="w-full border-2 border-ink bg-surface py-1.5 pr-8 pl-9 font-mono text-xs font-bold text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted hover:text-ink"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </Reveal>

          {/* Results Count */}
          <p className="mt-4 font-mono text-xs font-bold text-muted uppercase" aria-live="polite">
            &gt; DISPLAYING {filtered.length} OF {certificates.length} CERTIFICATE FILE(S)
          </p>

          {/* Certificates Grid */}
          {filtered.length === 0 ? (
            <div className="mt-8 border-2 border-ink bg-surface p-10 text-center retro-shadow">
              <p className="font-mono text-sm font-bold text-ink uppercase">
                [!] NO CERTIFICATES MATCHED &ldquo;{query}&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('All')
                  setQuery('')
                }}
                className="mt-4 inline-flex items-center gap-1.5 border-2 border-ink bg-accent-3 px-4 py-2 font-mono text-xs font-bold text-[#141413] uppercase retro-shadow-sm"
              >
                RESET FILTERS
              </button>
            </div>
          ) : (
            <motion.ul layout className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((cert, i) => (
                  <motion.li
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                    className="h-full"
                  >
                    <CertificateCard certificate={cert} index={i} onInspect={setSelected} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {/* Bottom Back to Portfolio Button */}
          <div className="mt-14 flex justify-center">
            <Button
              href="/#certificates"
              variant="secondary"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault()
                  onBack()
                }
              }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              RETURN TO MAIN PORTFOLIO
            </Button>
          </div>
        </div>
      </main>

      <Footer />
      <CertificateModal certificate={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
