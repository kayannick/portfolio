import type { ReactNode } from 'react'

type BadgeTone = 'neutral' | 'cyan' | 'violet'

interface BadgeProps {
  readonly children: ReactNode
  readonly tone?: BadgeTone
  readonly className?: string
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'border-white/10 bg-white/5 text-slate-300',
  cyan: 'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan',
  violet: 'border-brand-violet/30 bg-brand-violet/10 text-violet-300',
}

/** Pastille monospace pour technologies, statuts et métadonnées. */
export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs backdrop-blur-sm transition-colors duration-200 hover:border-white/20 ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}