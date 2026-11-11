import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/**
 * BackToTop — floating 90s 3D keycap button that appears after scrolling down.
 * Solid mustard fill, 2px ink border, hard offset shadow (zero gradients).
 */
export default function BackToTop() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 600))

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-1.5 border-2 border-ink bg-accent-3 px-3.5 py-2.5 font-mono text-xs font-bold text-[#141413] uppercase retro-shadow transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--border)] sm:right-8 sm:bottom-8"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
          <span>TOP</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
