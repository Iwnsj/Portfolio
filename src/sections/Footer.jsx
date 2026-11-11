import { Heart } from 'lucide-react'
import { navLinks, personal, socials } from '../data/portfolio'
import Reveal from '../components/Reveal'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t-2 border-ink bg-surface py-12">
      <Reveal className="container-page">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          {/* Brand + 90s badge */}
          <div className="text-center md:text-left">
            <a href="#home" className="font-display text-2xl font-bold text-ink uppercase">
              {personal.name}
              <span className="text-accent">.EXE</span>
            </a>
            <p className="mt-1.5 max-w-xs font-mono text-xs text-muted">{personal.role}</p>
            <div className="mt-3 inline-flex items-center gap-2 border-2 border-ink bg-accent-3 px-2.5 py-1 font-mono text-[11px] font-bold text-[#141413] uppercase retro-shadow-sm">
              <span>★ BEST VIEWED @ 1024×768</span>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs font-bold uppercase">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    [{link.label}]
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <ul className="flex gap-2" aria-label="Social links">
            {socials.map(({ name, url, icon: Icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid h-9 w-9 place-items-center border-2 border-ink bg-surface-alt text-ink retro-shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-accent-solid hover:text-white hover:shadow-none"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-ink pt-6 font-mono text-xs text-muted sm:flex-row">
          <p className="flex items-center gap-1.5">
            © {year} {personal.name}. All rights reserved.
          </p>
          {/* Attribution required by the Font Awesome Free (CC BY 4.0) icon licence */}
          <p>
            Icons:{' '}
            <a className="font-bold text-ink underline-offset-2 hover:text-accent hover:underline" href="https://lucide.dev" target="_blank" rel="noopener noreferrer">
              Lucide
            </a>
            ,{' '}
            <a className="font-bold text-ink underline-offset-2 hover:text-accent hover:underline" href="https://simpleicons.org" target="_blank" rel="noopener noreferrer">
              Simple Icons
            </a>
            ,{' '}
            <a className="font-bold text-ink underline-offset-2 hover:text-accent hover:underline" href="https://fontawesome.com/license/free" target="_blank" rel="noopener noreferrer">
              Font Awesome
            </a>{' '}
            · Photos:{' '}
            <a className="font-bold text-ink underline-offset-2 hover:text-accent hover:underline" href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
          </p>
        </div>
      </Reveal>
    </footer>
  )
}
