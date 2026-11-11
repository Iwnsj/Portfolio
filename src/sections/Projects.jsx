import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Coffee, FolderOpen, HardHat, Terminal, Wrench, X } from 'lucide-react'
import { projectCategories, projects } from '../data/portfolio'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [previewProject, setPreviewProject] = useState(null)
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  // Close screenshot lightbox on Escape
  useEffect(() => {
    if (!previewProject) return undefined
    const onKey = (e) => e.key === 'Escape' && setPreviewProject(null)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [previewProject])

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          index={3}
          eyebrow="C:\PROJECTS\*"
          title="Things I've built"
          subtitle="Real-world systems, IoT dashboards and interactive study companions I've designed and built. Pick a directory below to filter."
        />

        {/* 90s Folder / Disk Filter Bar */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mb-10 inline-flex flex-wrap items-center gap-2 border-2 border-ink bg-surface-alt p-2 retro-shadow-sm"
          >
            <span
              aria-hidden="true"
              className="hidden items-center gap-1.5 px-2 font-mono text-xs font-bold text-muted uppercase sm:inline-flex"
            >
              <FolderOpen className="h-4 w-4 text-accent" /> DIR:
            </span>
            {projectCategories.map((cat) => {
              const active = filter === cat
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  aria-controls="project-grid"
                  onClick={() => setFilter(cat)}
                  className={`relative px-4 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
                    active ? 'text-white' : 'border-2 border-ink bg-surface text-ink hover:bg-accent-3 hover:text-[#141413]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 border-2 border-ink bg-accent-solid retro-shadow-sm"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">[{cat}]</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Announce filter results to screen readers */}
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {filter === 'All' ? '' : filter} project{visible.length === 1 ? '' : 's'}
        </p>

        {/* Empty category state (e.g. Backend) — funny 90s "Still Cooking in Production" Window */}
        {visible.length === 0 ? (
          <motion.div
            key={`empty-${filter}`}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="mx-auto max-w-3xl border-2 border-ink bg-surface retro-shadow-lg"
          >
            {/* Classic 90s Warning Title Bar */}
            <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-win-bar px-3.5 py-2 font-mono text-xs font-bold text-win-bar-text uppercase">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 border border-current bg-accent-3" />
                <span>C:\PROJECTS\{filter.toUpperCase()}\STILL_COOKING.EXE</span>
              </div>
              <span>[_][□][×]</span>
            </div>

            <div className="p-6 sm:p-8">
              {/* Retro Construction Sticker Banner */}
              <div className="inline-flex items-center gap-2 border-2 border-ink bg-accent-3 px-3 py-1 font-mono text-xs font-bold text-[#141413] uppercase retro-shadow-sm">
                <HardHat className="h-4 w-4" aria-hidden="true" />
                <span>STATUS 418 // SECTOR STILL IN THE OVEN</span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight uppercase sm:text-3xl">
                Hold your horses! My {filter} lab is still cooking.
              </h3>

              <p className="mt-3 text-base leading-relaxed text-muted">
                No standalone <strong className="font-bold text-ink">{filter}</strong> deployments live here just yet —
                they&apos;re currently marinating in <code className="border border-ink bg-surface-alt px-1.5 py-0.5 font-mono text-xs font-bold text-ink">localhost:8080</code>,
                chugging coffee, and negotiating peace treaties with the database.
              </p>

              {/* Funny 90s DOS Terminal Diagnostic Box */}
              <div className="mt-5 border-2 border-ink bg-surface-alt p-4 font-mono text-xs leading-relaxed text-ink">
                <p className="flex items-center gap-2 font-bold text-accent">
                  <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>C:\PROJECTS\{filter.toUpperCase()}&gt; run diagnostics.bat</span>
                </p>
                <p className="mt-2">&gt; Checking caffeine levels................. [999 CUPS — MAXIMUM OVERDRIVE]</p>
                <p>&gt; Untangling spaghetti endpoints........... [██████░░░░] 64%</p>
                <p>&gt; Bribing the server hamster with snacks... [IN PROGRESS]</p>
                <p className="mt-2 font-bold text-accent-2">
                  &gt; TIP: Peek at [FULL-STACK] to see my PHP + MariaDB Barangay System in action!
                </p>
              </div>

              {/* Quick actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilter('Full-Stack')}
                  className="inline-flex items-center gap-2 border-2 border-ink bg-accent-solid px-4 py-2.5 font-mono text-xs font-bold text-white uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                >
                  <Wrench className="h-4 w-4" aria-hidden="true" /> PEEK AT FULL-STACK
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('All')}
                  className="inline-flex items-center gap-2 border-2 border-ink bg-accent-3 px-4 py-2.5 font-mono text-xs font-bold text-[#141413] uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                >
                  <Coffee className="h-4 w-4" aria-hidden="true" /> SHOW ALL PROJECTS ({projects.length})
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Animated project grid */
          <motion.ul id="project-grid" layout className="grid gap-7 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <motion.li
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <ProjectCard project={project} onPreview={setPreviewProject} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>

      {/* 90s Project Screenshot Lightbox Modal */}
      <AnimatePresence>
        {previewProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${previewProject.title} screenshot preview`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[92vh] w-full max-w-5xl flex-col border-2 border-ink bg-surface retro-shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 border-b-2 border-ink bg-win-bar px-3.5 py-2 text-win-bar-text">
                <span className="truncate font-mono text-xs font-bold tracking-wider uppercase">
                  IMAGE_VIEWER.EXE // {previewProject.title.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => setPreviewProject(null)}
                  className="inline-flex items-center gap-1 border-2 border-ink bg-accent-solid px-2.5 py-0.5 font-mono text-xs font-bold text-white uppercase"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" /> CLOSE [ESC]
                </button>
              </div>
              <div className="overflow-y-auto p-4 sm:p-6">
                <div className="border-2 border-ink bg-surface-alt p-2">
                  <img
                    src={previewProject.image}
                    alt={`Screenshot of ${previewProject.title}`}
                    className="mx-auto max-h-[65vh] w-auto border-2 border-ink object-contain"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold uppercase">{previewProject.title}</h3>
                    <p className="mt-1 text-sm text-muted">{previewProject.description}</p>
                  </div>
                  {previewProject.live ? (
                    <a
                      href={previewProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-accent-solid px-4 py-2 font-mono text-xs font-bold text-white uppercase retro-shadow-sm"
                    >
                      OPEN LIVE SITE <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    previewProject.liveStatus && (
                      <span className="border-2 border-ink bg-accent-3 px-3 py-1.5 font-mono text-xs font-bold text-[#141413] uppercase">
                        LIVE DEMO: {previewProject.liveStatus}
                      </span>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
