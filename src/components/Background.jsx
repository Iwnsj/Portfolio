import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Background — fixed 90s workstation backdrop (100% flat solid colors, zero gradients):
 *   1. Crisp SVG dot-matrix & registration-crosshair grid pattern
 *   2. Interactive <canvas> wireframe network with pixel squares, hollow 90s
 *      geometric shapes and solid connecting lines that react to the cursor.
 *
 * Pauses when the browser tab is hidden and is skipped when reduced motion is enabled.
 */
export default function Background() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* 1 — Crisp SVG dot-matrix + crosshair grid (zero gradients) */}
      <svg className="absolute inset-0 h-full w-full opacity-25 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="retro-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="2" height="2" fill="currentColor" />
          </pattern>
          <pattern id="retro-cross" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="160" height="160" fill="url(#retro-grid)" />
            <path d="M 76 80 L 84 80 M 80 76 L 80 84" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#retro-cross)" />
      </svg>

      {/* 2 — Interactive 90s pixel & wireframe canvas */}
      {!reduceMotion && <RetroCanvas />}
    </div>
  )
}

/** Interactive 90s geometric pixel nodes & wireframe links (solid colors only). */
function RetroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mouse = { x: -9999, y: -9999 }
    const LINK_DIST = 125
    const MOUSE_DIST = 150
    let nodes = []
    let width = 0
    let height = 0
    let rafId = 0
    let palette = ['#d9381e', '#007a78', '#f2b705', '#141413']
    let lineColor = '#141413'

    const readPalette = () => {
      const styles = getComputedStyle(document.documentElement)
      const accent = styles.getPropertyValue('--accent').trim() || '#d9381e'
      const accent2 = styles.getPropertyValue('--accent-2').trim() || '#007a78'
      const accent3 = styles.getPropertyValue('--accent-3').trim() || '#f2b705'
      const ink = styles.getPropertyValue('--ink').trim() || '#141413'
      palette = [accent, accent2, accent3, ink]
      lineColor = ink
    }

    const shapes = ['square', 'hollow', 'plus']

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = false

      const count = Math.min(55, Math.floor((width * height) / 24000))
      if (nodes.length > count) nodes = nodes.slice(0, count)
      while (nodes.length < count) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() > 0.7 ? 7 : 5,
          shape: shapes[nodes.length % shapes.length],
          colorIndex: nodes.length % palette.length,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i]

        // Crisp repulsion from cursor
        const dxm = p.x - mouse.x
        const dym = p.y - mouse.y
        const dm = Math.hypot(dxm, dym)
        if (dm < MOUSE_DIST && dm > 0) {
          const force = (MOUSE_DIST - dm) / MOUSE_DIST
          p.x += (dxm / dm) * force * 1.4
          p.y += (dym / dm) * force * 1.4
        }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        // Connect nearby nodes with flat 1px wireframe lines
        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < LINK_DIST) {
            ctx.save()
            ctx.globalAlpha = 0.14
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(Math.round(p.x), Math.round(p.y))
            ctx.lineTo(Math.round(q.x), Math.round(q.y))
            ctx.stroke()
            ctx.restore()
          }
        }

        // Draw crisp 90s pixel/geometric node
        const x = Math.round(p.x)
        const y = Math.round(p.y)
        const s = p.size
        const col = palette[p.colorIndex % palette.length]

        ctx.save()
        ctx.globalAlpha = 0.75
        ctx.fillStyle = col
        ctx.strokeStyle = col
        ctx.lineWidth = 1.5

        if (p.shape === 'square') {
          ctx.fillRect(x - s / 2, y - s / 2, s, s)
        } else if (p.shape === 'hollow') {
          ctx.strokeRect(x - s / 2, y - s / 2, s + 2, s + 2)
        } else {
          ctx.beginPath()
          ctx.moveTo(x - s, y)
          ctx.lineTo(x + s, y)
          ctx.moveTo(x, y - s)
          ctx.lineTo(x, y + s)
          ctx.stroke()
        }
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onVisibility = () => {
      cancelAnimationFrame(rafId)
      if (!document.hidden) rafId = requestAnimationFrame(draw)
    }

    const themeObserver = new MutationObserver(readPalette)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    readPalette()
    resize()
    rafId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      themeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
