/** Langues supportées par le portfolio. */
export type Language = 'fr' | 'en'

/** Texte disponible dans toutes les langues. */
export type Localized = Readonly<Record<Language, string>>

/** Identifiants des sections (utilisés pour la navigation par ancres). */
export type SectionId = 'home' | 'skills' | 'projects' | 'journey' | 'contact'

export interface Profile {
  readonly fullName: string
  readonly role: Localized
  readonly location: Localized
  readonly email: string
  readonly phone: string
  /** Numéro WhatsApp au format international, sans "+" (ex. 237XXXXXXXXX). */
  readonly whatsappNumber: string
  readonly github: string
  /** null tant que le profil LinkedIn n'est pas renseigné. */
  readonly linkedin: string | null
  readonly cvPath: string
  readonly photoPath: string
}

export type SkillLevel = 'foundation' | 'intermediate' | 'proficient'

export interface Skill {
  readonly name: string
  readonly level: SkillLevel
}

export type SkillCategoryId = 'frontend' | 'backend' | 'tools'

export interface SkillCategory {
  readonly id: SkillCategoryId
  readonly title: Localized
  readonly skills: readonly Skill[]
}

export type ProjectStatus = 'live' | 'in-progress'

export interface Project {
  readonly id: string
  readonly name: string
  readonly status: ProjectStatus
  readonly isPwa: boolean
  readonly summary: Localized
  readonly role: Localized
  readonly duration: Localized
  readonly problem: Localized
  readonly solution: Localized
  readonly challenges: readonly Localized[]
  readonly stack: readonly string[]
  readonly image: string
  readonly githubUrl: string
  /** null si aucune démo n'est disponible. */
  readonly demoUrl: string | null
}

export type JourneyKind = 'education' | 'experience' | 'training'

export interface JourneyItem {
  readonly id: string
  readonly kind: JourneyKind
  readonly title: Localized
  readonly organization: string
  readonly period: Localized
  readonly description: Localized
  /** Réalisations concrètes, affichées en liste. Peut être vide. */
  readonly highlights: readonly Localized[]
  /** Vrai pour une formation ou expérience toujours en cours. */
  readonly isCurrent: boolean
}

export interface Certification {
  readonly id: string
  readonly name: Localized
  /** null tant que l'organisme émetteur n'est pas renseigné. */
  readonly issuer: string | null
  /** null tant que l'année n'est pas renseignée. */
  readonly year: string | null
}

export type SnippetLanguage = 'python' | 'tsx' | 'sql' | 'typescript'

export interface CodeSnippet {
  readonly id: string
  readonly fileName: string
  readonly language: SnippetLanguage
  readonly code: string
}