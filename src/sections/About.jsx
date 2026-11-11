import { motion } from 'framer-motion'
import { personal, quickFacts, stats } from '../data/portfolio'
import AnimatedCounter from '../components/AnimatedCounter'
import Reveal, { fadeUpItem, staggerContainer } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpotlightCard from '../components/SpotlightCard'

const tileColors = [
  'bg-accent-solid text-white',
  'bg-accent-2 text-white',
  'bg-accent-3 text-[#141413]',
  'bg-win-bar text-win-bar-text',
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id="about-title" index={1} eyebrow="ABOUT_ME.TXT" title="A little bit about me" />

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* Portrait inside a 90s Image Viewer Window (zero gradients) */}
          <Reveal from="left" className="mx-auto w-full max-w-sm">
            <div className="relative">
              {/* Solid offset backing plate */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-ink bg-accent-3"
              />

              <SpotlightCard title="portrait.bmp — 100%" className="relative">
                <div className="bg-surface-alt p-3">
                  <div className="overflow-hidden border-2 border-ink bg-surface">
                    <img
                      src={personal.photo}
                      alt={`Portrait of ${personal.name}`}
                      width="400"
                      height="500"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between font-mono text-[11px] font-bold text-muted uppercase">
                    <span>400×500 PX</span>
                    <span>256 COLORS</span>
                  </div>
                </div>
              </SpotlightCard>

              {/* Rotated 90s Sticker Badge */}
              <motion.div
                className="absolute -right-3 -bottom-5 rotate-[-3deg] border-2 border-ink bg-accent-solid px-3.5 py-2 text-white retro-shadow sm:-right-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <p className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-90">STATUS // NOW</p>
                <p className="font-display text-sm font-bold uppercase">Building cool stuff ★</p>
              </motion.div>
            </div>
          </Reveal>

          {/* Bio, Quick Facts & Retro Digital Counters */}
          <div>
            <Reveal>
              <SpotlightCard title="readme.txt — Notepad" bodyClassName="p-5 sm:p-6">
                {personal.bio.map((paragraph, i) => (
                  <p key={i} className="mb-4 last:mb-0 text-base leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))}
              </SpotlightCard>
            </Reveal>

            {/* Quick facts */}
            <motion.ul
              className="mt-6 grid gap-3 sm:grid-cols-2"
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {quickFacts.map(({ icon: Icon, label, value }, i) => (
                <motion.li key={label} variants={fadeUpItem}>
                  <SpotlightCard className="flex items-center gap-3 p-3.5">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center border-2 border-ink ${tileColors[i % tileColors.length]}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] font-bold tracking-wider text-muted uppercase">
                        {label}
                      </span>
                      <span className="block text-sm font-bold text-ink">{value}</span>
                    </span>
                  </SpotlightCard>
                </motion.li>
              ))}
            </motion.ul>

            {/* 90s Digital / Pixel Counters (zero gradients) */}
            <dl className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="flex flex-col-reverse border-2 border-ink bg-surface p-3.5 text-center retro-shadow-sm">
                    <dt className="mt-1 font-mono text-[11px] font-bold tracking-wider text-muted uppercase">
                      {stat.label}
                    </dt>
                    <dd className="font-pixel text-4xl leading-none font-bold text-accent sm:text-5xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
