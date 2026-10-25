import { createContext } from 'react'
import type { Language, Localized } from '@/types'
import type { Dictionary } from './dictionary'

export interface LanguageContextValue {
  readonly language: Language
  readonly setLanguage: (language: Language) => void
  /** Textes d'interface dans la langue active. */
  readonly t: Dictionary
  /** Extrait la bonne langue d'un contenu localisé (données). */
  readonly l: (text: Localized) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)