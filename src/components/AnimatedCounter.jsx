import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * AnimatedCounter — counts from 0 to `value` once it scrolls into view.
 * Writes directly to the DOM node to avoid re-rendering every frame.
 */
export default function AnimatedCounter({ value, suffix = '', duration = 2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return undefined
    if (reduceMotion) {
      node.textContent = `${value}${suffix}`
      return undefined
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, duration, reduceMotion])

  return (
    <span ref={ref} className={className} aria-label={`${value}${suffix}`}>
      0{suffix}
    </span>
  )
}
