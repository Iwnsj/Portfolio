import { ArrowUpRight, Eye, Lock, Star } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import LazyImage from './LazyImage'

/**
 * ProjectCard — 90s Application Window Card (zero gradients).
 * Features a classic OS title bar with filename (`hydrosync.exe`), pinstripes,
 * [_][□][×] buttons, framed screenshot, flat sticker tags, and tactile 3D buttons.
 */
export default function ProjectCard({ project, onPreview }) {
  const fileName = `${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.exe`

  return (
    <article className="group relative flex h-full flex-col border-2 border-ink bg-surface retro-shadow transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_var(--accent)]">
      {/* Classic 90s Window Title Bar */}
      <div
        aria-hidden="true"
        className="flex items-center justify-between gap-2 border-b-2 border-ink bg-win-bar px-3 py-1.5 text-win-bar-text select-none"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 shrink-0 border border-current bg-accent-3" />
          <span className="truncate font-mono text-xs font-bold tracking-wider uppercase">{fileName}</span>
        </div>
        <div className="mx-1 hidden h-3 flex-1 flex-col justify-between opacity-35 sm:flex">
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
          <span className="block h-px w-full bg-current" />
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span className="grid h-4 w-4 place-items-center border border-ink bg-surface text-[10px] leading-none font-bold text-ink">
            _
          </span>
          <span className="grid h-4 w-4 place-items-center border border-ink bg-surface text-[10px] leading-none font-bold text-ink">
            □
          </span>
          <span className="grid h-4 w-4 place-items-center border border-ink bg-accent-solid text-[10px] leading-none font-bold text-white">
            ×
          </span>
        </div>
      </div>

      {/* Framed Image Viewport (zero gradient overlays) */}
      <div className="relative border-b-2 border-ink bg-surface-alt p-2.5">
        <button
          type="button"
          onClick={() => onPreview?.(project)}
          aria-label={`Preview screenshot of ${project.title}`}
          className="group/img relative block w-full overflow-hidden border-2 border-ink bg-surface text-left focus:outline-none"
        >
          <LazyImage
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            width="800"
            height="450"
            wrapperClassName="aspect-video bg-surface-alt"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105"
          />
          {project.featured && (
            <span className="absolute top-2 left-2 inline-flex items-center gap-1 border-2 border-ink bg-accent-3 px-2 py-0.5 font-mono text-[11px] font-bold text-[#141413] uppercase retro-shadow-sm">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> HOT_PICK
            </span>
          )}
          <span className="absolute top-2 right-2 border-2 border-ink bg-surface px-2 py-0.5 font-mono text-[11px] font-bold text-ink uppercase retro-shadow-sm">
            {project.category}
          </span>
          <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 border-2 border-ink bg-accent-solid px-2 py-0.5 font-mono text-[10px] font-bold text-white uppercase opacity-0 transition-opacity duration-150 group-hover/img:opacity-100">
            <Eye className="h-3 w-3" aria-hidden="true" /> ZOOM_IMG
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold tracking-tight uppercase transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-ink bg-surface-alt px-2 py-0.5 font-mono text-[11px] font-semibold text-ink"
            >
              #{tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t-2 border-ink pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="inline-flex items-center gap-1.5 border-2 border-ink bg-surface-alt px-3 py-1.5 font-mono text-xs font-bold text-ink uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-accent-3 hover:text-[#141413] hover:shadow-none"
            >
              <FaGithub className="h-3.5 w-3.5" aria-hidden="true" /> SOURCE
            </a>
          )}

          <button
            type="button"
            onClick={() => onPreview?.(project)}
            className="inline-flex items-center gap-1.5 border-2 border-ink bg-surface-alt px-3 py-1.5 font-mono text-xs font-bold text-ink uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-accent-3 hover:text-[#141413] hover:shadow-none"
          >
            <Eye className="h-3.5 w-3.5" aria-hidden="true" /> SCREENSHOT
          </button>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="group/link ml-auto inline-flex items-center gap-1 border-2 border-ink bg-accent-solid px-3.5 py-1.5 font-mono text-xs font-bold text-white uppercase retro-shadow-sm transition-all duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
            >
              RUN_APP
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          ) : (
            project.liveStatus && (
              <span
                title="Live hosting is not supported yet for this local PHP + MariaDB project"
                className="ml-auto inline-flex items-center gap-1.5 border-2 border-ink bg-accent-3 px-3 py-1.5 font-mono text-[11px] font-bold text-[#141413] uppercase"
              >
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> {project.liveStatus}
              </span>
            )
          )}
        </div>
      </div>
    </article>
  )
}
