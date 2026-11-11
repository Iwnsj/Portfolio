import { motion } from 'framer-motion'

/**
 * Button — 90s tactile 3D push-button (zero gradients).
 * Physically presses down into its hard offset shadow on hover/click.
 * Variants:
 *   primary   → solid vermilion accent with crisp ink border
 *   secondary → solid mustard / warm surface keycap button
 *   ghost     → recessed toolbar button
 */
const base =
  'group relative inline-flex items-center justify-center gap-2 border-2 border-ink px-6 py-3 font-mono text-xs font-bold tracking-wider uppercase transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60'

const styles = {
  primary:
    'bg-accent-solid text-white retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
  secondary:
    'bg-accent-3 text-[#141413] retro-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--border)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none',
  ghost:
    'bg-surface text-ink retro-shadow-sm hover:bg-surface-alt hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none',
}

export default function Button({ href, variant = 'primary', className = '', children, ...rest }) {
  const Comp = href ? motion.a : motion.button
  return (
    <Comp href={href} className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Comp>
  )
}
