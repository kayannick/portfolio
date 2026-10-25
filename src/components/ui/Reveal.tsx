import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface RevealProps {
  readonly children: ReactNode
  /** Délai en millisecondes (pour échelonner plusieurs éléments). */
  readonly delay?: number
  readonly className?: string
}

/** Fait apparaître son contenu en fondu au premier passage à l'écran. */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView<HTMLDivElement>({ once: true })
  const isVisible = reducedMotion || inView

  const style: CSSProperties = { transitionDelay: isVisible ? `${delay}ms` : '0ms' }

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}