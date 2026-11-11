import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data/portfolio'

/**
 * Preloader — 90s OS / BIOS boot loader window with a segmented block bar.
 * Shown once per browser session and skipped for reduced-motion users.
 * Zero gradients or blur filters.
 */
export default function Preloader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1350)
    return () => clearTimeout(t)
  }, [onDone])

  const blocks = Array.from({ length: 10 })

  return (
    <motion.div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[200] grid place-items-center bg-bg p-4"
      exit={{ y: '-100%', transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="w-full max-w-md border-2 border-ink bg-surface retro-shadow-lg">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b-2 border-ink bg-win-bar px-3 py-1.5 font-mono text-xs font-bold text-win-bar-text uppercase">
          <span>SYSTEM_BOOT // {personal.initials}_OS v1.99</span>
          <span>[□][×]</span>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between font-mono text-xs text-muted uppercase">
            <span>LOADING PORTFOLIO.EXE...</span>
            <span className="font-bold text-ink">640K OK</span>
          </div>

          <p className="font-display text-3xl font-bold tracking-tight uppercase sm:text-4xl">
            {personal.name}
          </p>

          {/* Classic 90s segmented block progress bar */}
          <div className="grid grid-cols-10 gap-1.5 border-2 border-ink bg-surface-alt p-1.5">
            {blocks.map((_, i) => (
              <motion.span
                key={i}
                className="h-5 border border-ink bg-accent-solid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.09, duration: 0.05 }}
              />
            ))}
          </div>

          <p className="font-mono text-[11px] text-muted">
            &gt; INITIALIZING DESKTOP ENVIRONMENT... READY.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
