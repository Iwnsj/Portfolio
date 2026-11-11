import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolio'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpotlightCard from '../components/SpotlightCard'

const allSkills = skillCategories.flatMap((c) => c.skills)

const windowHeaders = [
  'bg-win-bar text-win-bar-text',
  'bg-accent-2 text-white',
  'bg-accent-solid text-white',
  'bg-accent-3 text-[#141413]',
]

/** A single 90s cartridge / keycap skill badge. */
function SkillBadge({ skill, index }) {
  const Icon = skill.icon
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 0.85, y: 10 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 300, damping: 20, delay: index * 0.035 },
        },
      }}
      whileHover={{ y: -3 }}
      className="group/badge flex cursor-default items-center gap-2 border-2 border-ink bg-surface-alt px-3 py-1.5 font-mono text-xs font-bold text-ink retro-shadow-sm transition-colors duration-150 hover:bg-accent-3 hover:text-[#141413]"
      style={{ '--brand': skill.color }}
    >
      <Icon
        aria-hidden="true"
        className="h-4 w-4 text-ink transition-colors duration-150 group-hover/badge:text-[#141413]"
      />
      {skill.name}
    </motion.li>
  )
}

/** Infinite 90s Ticker Tape strip (solid borders, zero gradient masks). */
function Marquee({ items, reverse = false }) {
  return (
    <div
      className="group/marquee flex overflow-hidden border-y-2 border-ink bg-surface py-2.5 retro-shadow-sm"
      aria-hidden="true"
    >
      <div
        className={`flex w-max shrink-0 group-hover/marquee:[animation-play-state:paused] ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {[...items, ...items].map((s, i) => {
          const Icon = s.icon
          return (
            <span
              key={`${s.name}-${i}`}
              className="mr-4 flex items-center gap-2 border-2 border-ink bg-surface-alt px-4 py-1.5 font-mono text-xs font-bold whitespace-nowrap text-ink uppercase"
            >
              <Icon className="h-4 w-4" style={{ color: s.color }} />
              <span>{s.name}</span>
              <span className="text-accent">★</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          index={2}
          eyebrow="TECH_STACK.DLL"
          title="My tech stack"
          subtitle="Tools and technologies I use to bring ideas to life — and the ones I'm currently levelling up."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, ci) => {
            const winTitle = `${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.grp`
            return (
              <Reveal key={category.title} delay={ci * 0.1} className="h-full">
                <SpotlightCard
                  title={winTitle}
                  headerColor={windowHeaders[ci % windowHeaders.length]}
                  className="h-full"
                  bodyClassName="p-6"
                >
                  <h3 className="text-xl font-bold uppercase">{category.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{category.description}</p>
                  <motion.ul
                    className="mt-5 flex flex-wrap gap-2.5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    aria-label={`${category.title} skills`}
                  >
                    {category.skills.map((skill, i) => (
                      <SkillBadge key={skill.name} skill={skill} index={i} />
                    ))}
                  </motion.ul>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Full-width 90s scrolling ticker strips */}
      <Reveal className="mt-16 space-y-3" from="up">
        <Marquee items={allSkills} />
        <Marquee items={[...allSkills].reverse()} reverse />
      </Reveal>
    </section>
  )
}
