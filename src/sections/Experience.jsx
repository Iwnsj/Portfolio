import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { timeline } from '../data/portfolio'
import SectionHeading from '../components/SectionHeading'
import SpotlightCard from '../components/SpotlightCard'

export default function Experience() {
  const listRef = useRef(null)

  // The timeline bar fills in solid vermilion as you scroll (zero gradients)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index={5}
          eyebrow="CAREER.LOG"
          title="Experience & education"
          align="center"
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Solid 90s timeline rail + animated solid progress bar */}
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-5 w-1 -translate-x-1/2 bg-ink/25 md:left-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-5 w-1 -translate-x-1/2 origin-top bg-accent-solid md:left-1/2"
          />

          <ol ref={listRef} className="space-y-10 md:space-y-14">
            {timeline.map((entry, i) => {
              const Icon = entry.icon
              const isLeft = i % 2 === 0
              const logTitle = `${entry.type}_0${i + 1}.log`
              return (
                <li key={`${entry.title}-${entry.org}`} className="relative pl-14 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
                  {/* Square 90s keycap node on the line */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                    className="absolute top-4 left-5 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center border-2 border-ink bg-accent-3 text-[#141413] retro-shadow-sm md:left-1/2"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.span>

                  {/* 90s Window Card (alternates sides on desktop) */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={isLeft ? 'md:col-start-1' : 'md:col-start-2'}
                  >
                    <SpotlightCard
                      title={logTitle}
                      headerColor={entry.type === 'work' ? 'bg-win-bar text-win-bar-text' : 'bg-accent-2 text-white'}
                      bodyClassName="p-5 sm:p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="border-2 border-ink bg-accent-3 px-2 py-0.5 font-mono text-[11px] font-bold text-[#141413] uppercase">
                          {entry.type === 'work' ? 'WORK_EXP' : 'EDUCATION'}
                        </span>
                        <time className="font-mono text-xs font-bold text-muted">{entry.period}</time>
                      </div>
                      <h3 className="mt-3 text-lg font-bold uppercase sm:text-xl">{entry.title}</h3>
                      <p className="font-mono text-xs font-bold text-accent uppercase">@ {entry.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{entry.description}</p>
                      {entry.highlights?.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {entry.highlights.map((h) => (
                            <li
                              key={h}
                              className="border border-ink bg-surface-alt px-2.5 py-1 font-mono text-xs font-semibold text-ink"
                            >
                              ✓ {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </SpotlightCard>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
