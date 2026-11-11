import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * CustomCursor — 90s CAD / Workstation square reticle + crosshair that
 * follows the mouse and expands over interactive elements.
 * Only rendered on fine-pointer devices when reduced motion is off.
 */
export default function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)')
  const reduceMotion = useReducedMotion()
  if (!finePointer || reduceMotion) return null
  return <CursorInner />
}

function CursorInner() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const boxX = useSpring(x, { stiffness: 360, damping: 28, mass: 0.45 })
  const boxY = useSpring(y, { stiffness: 360, damping: 28, mass: 0.45 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const interactive = 'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]'
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHovering(Boolean(e.target.closest?.(interactive)))
    }
    const onLeave = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [x, y])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      {/* Trailing 90s square reticle */}
      <motion.div
        className="absolute top-0 left-0 border-2 border-accent"
        style={{ x: boxX, y: boxY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 44 : 24,
          height: hovering ? 44 : 24,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          rotate: hovering ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      />
      {/* Precise pixel square center */}
      <motion.div
        className="absolute top-0 left-0 h-2 w-2 bg-ink"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  )
}
