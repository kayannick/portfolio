import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseInViewOptions {
  readonly threshold?: number
  /** Si vrai, l'état reste à "visible" après la première apparition. */
  readonly once?: boolean
}

interface UseInViewResult<T extends Element> {
  readonly ref: RefObject<T | null>
  readonly inView: boolean
}

/** Indique si l'élément référencé est visible à l'écran. */
export function useInView<T extends Element>({
  threshold = 0.15,
  once = false,
}: UseInViewOptions = {}): UseInViewResult<T> {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (element === null) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry === undefined) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  return { ref, inView }
}