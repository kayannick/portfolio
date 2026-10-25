import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Language, Localized } from '@/types'
import { dictionary } from './dictionary'
import { LanguageContext, type LanguageContextValue } from './LanguageContext'

const STORAGE_KEY = 'portfolio-language'

function isLanguage(value: string | null): value is Language {
  return value === 'fr' || value === 'en'
}

/** Langue mémorisée, sinon langue du navigateur, sinon anglais. */
function detectInitialLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLanguage(stored)) return stored
  } catch {
    // Stockage indisponible (navigation privée, etc.) : on continue.
  }
  return window.navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

interface LanguageProviderProps {
  readonly children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Non bloquant.
    }
  }, [])

  // Accessibilité et SEO : l'attribut lang suit la langue active.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: dictionary[language],
      l: (text: Localized) => text[language],
    }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}