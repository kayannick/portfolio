import type { ReactNode } from 'react'

type CardTag = 'div' | 'article' | 'li'

interface GlassCardProps {
  readonly children: ReactNode
  readonly as?: CardTag
  readonly className?: string
}

/** Carte glassmorphism : fond translucide, flou d'arrière-plan, bordure subtile. */
export function GlassCard({ children, as: Tag = 'div', className = '' }: GlassCardProps) {
  return (
    <Tag
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/30 hover:bg-white/[0.07] hover:shadow-lg hover:shadow-brand-cyan/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent"
      />
      {children}
    </Tag>
  )
}