import { motion } from 'framer-motion'

/** Animation presets shared by <Reveal> (crisp 90s motion, zero blur filters). */
const variants = {
  up: { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1 } },
}

/**
 * Reveal — fades/slides its children in when scrolled into view.
 * Motion is automatically reduced via <MotionConfig reducedMotion="user"> in App.
 *
 * @param {'up'|'down'|'left'|'right'|'scale'} from - entrance direction
 * @param {number} delay - seconds to wait before animating
 * @param {string} as - HTML tag to render (div, li, article …)
 */
export default function Reveal({ children, from = 'up', delay = 0, duration = 0.55, as = 'div', className, ...rest }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      className={className}
      variants={variants[from] ?? variants.up}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  )
}

/** Parent/child variants for staggered lists. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

export const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}
