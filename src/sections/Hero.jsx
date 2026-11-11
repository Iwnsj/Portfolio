import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, Terminal } from 'lucide-react'
import { personal, socials } from '../data/portfolio'
import Button from '../components/Button'
import Magnetic from '../components/Magnetic'
import TypingText from '../components/TypingText'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/** Splits a string into letters that pop up one after another. */
function LetterReveal({ text }) {
  return (
    <span aria-label={text} className="inline-block">
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: '0.5em' },
            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease, delay: i * 0.025 } },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ ready }) {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative flex min-h-svh items-center pt-28 pb-20 sm:pt-32"
    >
      <motion.div
        className="container-page flex flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
      >
        {/* 90s System Status Sticker */}
        <motion.div variants={item}>
          <div className="inline-flex items-center border-2 border-ink bg-surface retro-shadow-sm">
            <span className="inline-flex items-center gap-1.5 border-r-2 border-ink bg-accent-3 px-2.5 py-1 font-mono text-xs font-bold text-[#141413] uppercase">
              <span className="h-2.5 w-2.5 border border-[#141413] bg-emerald-500" aria-hidden="true" />
              ONLINE
            </span>
            <span className="px-3 py-1 font-mono text-xs font-semibold text-ink">
              {personal.availability}
            </span>
          </div>
        </motion.div>

        {/* Command-line greeting */}
        <motion.p
          variants={item}
          className="mt-7 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-accent uppercase sm:text-sm"
        >
          <Terminal className="h-4 w-4" aria-hidden="true" />
          <LetterReveal text="C:\USERS\VISITOR> HELLO_WORLD.EXE" />
        </motion.p>

        {/* Huge 90s Display Name — solid 3D offset block shadow, zero gradients */}
        <motion.div variants={item} className="relative mt-3 inline-block">
          <h1 className="text-retro-3d font-display text-5xl leading-[1.02] font-bold tracking-tight text-ink uppercase sm:text-7xl lg:text-8xl">
            {personal.name}
          </h1>
          <span
            aria-hidden="true"
            className="mt-2 inline-block rotate-[-2deg] border-2 border-ink bg-accent-2 px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-wider text-white uppercase retro-shadow-sm sm:absolute sm:-top-4 sm:-right-14 sm:mt-0 sm:rotate-6"
          >
            VER 199X
          </span>
        </motion.div>

        {/* Framed 90s Terminal Prompt for Typing Role */}
        <motion.div
          variants={item}
          className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 border-2 border-ink bg-surface px-4 py-2.5 font-mono text-base font-bold text-ink retro-shadow sm:px-6 sm:text-xl"
        >
          <span className="text-accent">&gt; ROLE:</span>
          <TypingText words={personal.typingRoles} className="text-ink" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {personal.tagline}
        </motion.p>

        {/* Tactile 3D Call-to-action buttons */}
        <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button href="#projects">
              VIEW MY WORK
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="#contact" variant="secondary">
              GET IN TOUCH
            </Button>
          </Magnetic>
          {personal.resumeUrl && (
            <Button href={personal.resumeUrl} variant="ghost" download>
              <Download className="h-4 w-4" /> RESUME.PDF
            </Button>
          )}
        </motion.div>

        {/* 90s 3D Keycap Social Links */}
        <motion.ul variants={item} className="mt-9 flex items-center gap-3" aria-label="Social links">
          {socials.map(({ name, url, icon: Icon }) => (
            <li key={name}>
              <Magnetic strength={0.4}>
                <a
                  href={url}
                  target={url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="grid h-11 w-11 place-items-center border-2 border-ink bg-surface text-ink retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-accent-3 hover:text-[#141413] hover:shadow-none"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 border-2 border-ink bg-surface px-3 py-1 font-mono text-xs font-bold text-ink uppercase retro-shadow-sm transition-transform hover:translate-y-0.5 sm:inline-flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <span>SCROLL_DOWN</span>
        <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-3.5 w-3.5 text-accent" />
        </motion.span>
      </motion.a>
    </section>
  )
}
