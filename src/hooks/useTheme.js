import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

const getInitialTheme = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'

/** Writes the theme to <html>, localStorage and the browser UI colour. */
function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* storage may be blocked — ignore */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#121417' : '#ebe5d5')
}

/**
 * useTheme — dark / light mode with a circular "reveal" transition.
 * Uses the View Transitions API when available and falls back to an
 * instant switch (also when the user prefers reduced motion).
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  // Keep colour-scheme in sync on first mount
  useEffect(() => {
    document.documentElement.style.colorScheme = theme
  }, [theme])

  const toggleTheme = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const commit = () => {
        applyTheme(next)
        flushSync(() => setTheme(next))
      }

      if (!document.startViewTransition || reduceMotion) {
        commit()
        return
      }

      // Origin of the circular reveal = centre of the clicked button
      const rect = event?.currentTarget?.getBoundingClientRect()
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
      const y = rect ? rect.top + rect.height / 2 : 0
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

      const transition = document.startViewTransition(commit)
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 500, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' },
          )
        })
        .catch(() => {})
    },
    [theme],
  )

  return { theme, toggleTheme }
}
