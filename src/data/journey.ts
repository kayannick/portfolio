import type { Certification, JourneyItem } from '@/types'

/** Ordre chronologique inverse : le plus récent en premier. */
export const journeyItems: readonly JourneyItem[] = [
  {
    id: 'qwasa',
    kind: 'training',
    isCurrent: true,
    title: {
      fr: 'Formation certifiante en développement Full-Stack',
      en: 'Certified Full-Stack Development Training',
    },
    organization: 'Qwasa',
    period: { fr: 'En cours · 7 mois', en: 'Ongoing · 7 months' },
    description: {
      fr: 'Programme de 7 mois menant à une certification en développement Full-Stack, pour consolider ma pratique et structurer mes méthodes de travail.',
      en: 'A 7-month program leading to a Full-Stack development certification, to strengthen my practice and structure my working methods.',
    },
    highlights: [],
  },
  {
    id: 'hgoped',
    kind: 'experience',
    isCurrent: false,
    title: {
      fr: 'Stage informatique : refonte de l’intranet',
      en: 'IT Internship: Intranet Redesign',
    },
    organization: 'HGOPED · Hôpital Gynéco-Obstétrique et Pédiatrique de Douala',
    period: { fr: 'Oct. 2025 – Janv. 2026', en: 'Oct 2025 – Jan 2026' },
    description: {
      fr: 'Stage de 3 mois dans un hôpital public de première catégorie : refonte du site intranet pour fluidifier l’information entre les services.',
      en: '3-month internship in a first-category public hospital: redesign of the intranet site to streamline information flow between departments.',
    },
    highlights: [
      {
        fr: 'Analyse des besoins des utilisateurs et des services.',
        en: 'Analysis of user and department needs.',
      },
      {
        fr: 'Structuration des contenus et optimisation de la circulation de l’information entre les services.',
        en: 'Content structuring and optimization of information flow between departments.',
      },
      {
        fr: 'Maintenance du matériel informatique.',
        en: 'IT hardware maintenance.',
      },
    ],
  },
  {
    id: 'licence',
    kind: 'education',
    isCurrent: false,
    title: {
      fr: 'Licence en Génie Logiciel',
      en: 'Bachelor’s Degree in Software Engineering',
    },
    organization: 'IUT de Douala',
    period: { fr: '2025', en: '2025' },
    description: {
      fr: 'Formation en génie logiciel : conception, développement et gestion de projets informatiques.',
      en: 'Software engineering degree: design, development and management of IT projects.',
    },
    highlights: [],
  },
  {
    id: 'bts',
    kind: 'education',
    isCurrent: false,
    title: {
      fr: 'BTS Génie Logiciel',
      en: 'Higher National Diploma in Software Engineering (BTS)',
    },
    organization: 'IUG de Douala',
    period: { fr: '2024', en: '2024' },
    description: {
      fr: 'Premier cycle supérieur en génie logiciel : bases de la programmation et du développement d’applications.',
      en: 'First higher-education cycle in software engineering: programming fundamentals and application development.',
    },
    highlights: [],
  },
  {
    id: 'icrafon',
    kind: 'experience',
    isCurrent: false,
    title: {
      fr: 'Stage d’informaticien (IT) : sécurisation et support',
      en: 'IT Internship: Security & Support',
    },
    organization: 'ICRAFON · Groupe CFAO',
    period: { fr: 'Juil. – Sept. 2023', en: 'Jul – Sep 2023' },
    description: {
      fr: 'Stage en environnement industriel (fabrication d’emballages plastiques), dans une démarche de sécurisation et de standardisation des processus IT.',
      en: 'Internship in an industrial environment (plastic packaging manufacturing), as part of an effort to secure and standardize IT processes.',
    },
    highlights: [
      {
        fr: 'Déploiement d’une solution EDR (détection et réponse sur les terminaux).',
        en: 'Deployment of an EDR solution (endpoint detection and response).',
      },
      {
        fr: 'Configuration de l’authentification multifacteur avec Okta Verify.',
        en: 'Configuration of multi-factor authentication with Okta Verify.',
      },
      {
        fr: 'Support utilisateur quotidien, avec un suivi rigoureux des demandes traitées.',
        en: 'Daily user support, with rigorous tracking of handled requests.',
      },
    ],
  },
]

export const certifications: readonly Certification[] = [
  {
    id: 'google-workspace',
    name: {
      fr: 'Google Workspace (Sheets, Docs, Drive, Gmail)',
      en: 'Google Workspace (Sheets, Docs, Drive, Gmail)',
    },
    issuer: 'Google',
    year: '2026',
  },
  {
    id: 'ai-fundamentals',
    name: {
      fr: 'Fondamentaux de l’IA et de l’IA générative',
      en: 'AI and Generative AI Fundamentals',
    },
    issuer: null,
    year: null,
  },
]