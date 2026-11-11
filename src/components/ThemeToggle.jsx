import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

/**
 * ThemeToggle — 90s tactile hardware keycap button that switches between
 * Light ("DAY / 95 DESKTOP") and Dark ("CRT NIGHT") modes.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ x: 2, y: 2 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative inline-flex h-10 items-center gap-2 border-2 border-ink bg-accent-3 px-3 font-mono text-xs font-bold tracking-wider text-[#141413] uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 12, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {isDark ? (
            <>
              <Moon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">CRT</span>
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">95 OS</span>
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
