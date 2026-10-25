import { useEffect, useState } from 'react'
import type { SectionId } from '@/types'

/**
 * Retourne l'identifiant de la section actuellement visible au centre de l'écran.
 * Les sections sont repérées via leur attribut `id` dans le DOM.
 */
export function useScrollSpy(
  sectionIds: readonly SectionId[],
  fallback: SectionId = 'home',
): SectionId {
  const [activeId, setActiveId] = useState<SectionId>(fallback)

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) return undefined

    // Une section est "active" quand elle croise la bande centrale de l'écran.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const matchedId = sectionIds.find((id) => id === entry.target.id)
          if (matchedId !== undefined) setActiveId(matchedId)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((element) => observer.observe(element))

    // Cas particulier : en bas de page, la dernière section (courte) doit être active.
    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const lastId = sectionIds[sectionIds.length - 1]
      if (reachedBottom && lastId !== undefined) setActiveId(lastId)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds])

  return activeId
}