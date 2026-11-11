import { motion, useScroll, useSpring } from 'framer-motion'

/** ScrollProgress — solid 90s progress strip at the very top of the viewport (zero gradients). */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1.5 origin-left border-b border-ink bg-accent-solid"
    />
  )
}
