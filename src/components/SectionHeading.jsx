import { motion } from 'framer-motion'
import Reveal from './Reveal'

/**
 * SectionHeading — 90s editorial/system header with a stamped index badge,
 * bold geometric display title, and a solid segmented rule (zero gradients).
 */
export default function SectionHeading({ id, index, eyebrow, title, subtitle, align = 'left' }) {
  const centered = align === 'center'
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <Reveal from="up">
        <div className={`mb-4 inline-flex items-center border-2 border-ink bg-surface retro-shadow-sm ${centered ? 'mx-auto' : ''}`}>
          <span className="border-r-2 border-ink bg-accent-3 px-2.5 py-1 font-mono text-xs font-bold text-[#141413]">
            SEC_{String(index).padStart(2, '0')}
          </span>
          <span className="px-3 py-1 font-mono text-xs font-bold tracking-wider text-ink uppercase">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className="text-3xl font-bold tracking-tight uppercase sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {/* Solid 90s segmented rule (zero gradients) */}
      <div
        aria-hidden="true"
        className={`mt-4 flex items-center gap-1.5 ${centered ? 'justify-center' : ''}`}
      >
        <span className="inline-block h-3 w-3 border-2 border-ink bg-accent-solid" />
        <span className="inline-block h-3 w-3 border-2 border-ink bg-accent-3" />
        <span className="inline-block h-3 w-3 border-2 border-ink bg-accent-2" />
        <motion.span
          className="inline-block h-1.5 w-24 origin-left border-2 border-ink bg-ink"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
