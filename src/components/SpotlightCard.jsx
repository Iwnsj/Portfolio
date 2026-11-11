/**
 * SpotlightCard — 90s OS Window / Panel Card (zero gradients).
 * Features a solid 2px ink border, flat surface fill, and a hard offset shadow
 * that shifts on hover. Pass `title` to render a classic 90s window title bar
 * with pinstripes and [_][□][×] controls.
 */
export default function SpotlightCard({
  children,
  title,
  headerColor = 'bg-win-bar text-win-bar-text',
  className = '',
  bodyClassName = '',
  as: Tag = 'div',
  ...rest
}) {
  if (title) {
    return (
      <Tag
        className={`group/win relative flex flex-col border-2 border-ink bg-surface retro-shadow transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] ${className}`}
        {...rest}
      >
        {/* Classic 90s Window Title Bar */}
        <div
          aria-hidden="true"
          className={`flex items-center justify-between gap-2 border-b-2 border-ink px-3 py-1.5 select-none ${headerColor}`}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 shrink-0 border border-current bg-accent-3" />
            <span className="truncate font-mono text-xs font-bold tracking-wider uppercase">{title}</span>
          </div>
          {/* Classic 90s Pinstripes */}
          <div className="mx-1 hidden h-3 flex-1 flex-col justify-between opacity-35 sm:flex">
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-full bg-current" />
            <span className="block h-px w-full bg-current" />
          </div>
          {/* [_][□][×] Window Controls */}
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
        <div className={`relative flex-1 ${bodyClassName}`}>{children}</div>
      </Tag>
    )
  }

  return (
    <Tag
      className={`group/spot relative border-2 border-ink bg-surface retro-shadow transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
