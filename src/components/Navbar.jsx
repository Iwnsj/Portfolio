import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Terminal, X } from 'lucide-react'
import { navLinks, personal } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'

// Stable array (defined once) so the observer isn't recreated each render
const SECTION_IDS = navLinks.map((l) => l.id)

/**
 * Navbar — 90s OS System Taskbar / Menu Bar.
 * Crisp 2px ink borders, solid flat surfaces, hard offset shadow, and a
 * sliding solid active-section tab. Zero gradients or blur filters.
 */
export default function Navbar() {
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)

  // Close the mobile menu with Escape & lock body scroll while open
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between border-2 border-ink bg-surface px-3 py-2 retro-shadow sm:px-4"
      >
        {/* Left: 90s Start / System Badge */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight"
          aria-label={`${personal.name} — home`}
        >
          <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-accent-solid font-display text-sm font-bold text-white retro-shadow-sm transition-transform duration-150 group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none">
            {personal.initials}
          </span>
          <span className="hidden items-center gap-1.5 text-ink sm:inline-flex">
            <Terminal className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>{personal.name.split(' ')[0].toUpperCase()}.EXE</span>
          </span>
        </a>

        {/* Center: Desktop Section Tabs */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, idx) => {
            const isActive = active === link.id
            return (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative z-10 block px-3 py-1.5 font-mono text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-ink hover:bg-surface-alt'
                  }`}
                >
                  <span className="mr-1 opacity-60">0{idx + 1}.</span>
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 border-2 border-ink bg-accent-solid retro-shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Right: Theme keycap + Mobile menu button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center border-2 border-ink bg-surface-alt text-ink retro-shadow-sm lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl border-2 border-ink bg-surface retro-shadow lg:hidden"
          >
            <div className="flex items-center justify-between border-b-2 border-ink bg-win-bar px-3 py-1 font-mono text-xs font-bold text-win-bar-text uppercase">
              <span>DIRECTORY // NAVIGATION</span>
              <span>[×]</span>
            </div>
            <ul className="divide-y-2 divide-ink/15 p-2">
              {navLinks.map((link, idx) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 font-mono text-sm font-bold uppercase transition-colors ${
                      active === link.id ? 'bg-accent-solid text-white' : 'text-ink hover:bg-surface-alt'
                    }`}
                  >
                    <span>
                      0{idx + 1}. {link.label}
                    </span>
                    {active === link.id && <span>[ACTIVE]</span>}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
