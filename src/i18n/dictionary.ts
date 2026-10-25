import type { Language } from '@/types'

const fr = {
  nav: {
    home: 'Accueil',
    skills: 'Compétences',
    projects: 'Projets',
    journey: 'Parcours',
    contact: 'Contact',
    downloadCv: 'Télécharger mon CV',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    languageLabel: 'Changer de langue',
    mainNavigation: 'Navigation principale',
  },
  hero: {
    availability: 'Disponible : emploi, stage et freelance',
    greeting: 'Bonjour, je suis',
    hook: 'Des applications web fiables, pensées pour la sécurité dès la première ligne.',
    valueProposition:
      'Je transforme des besoins concrets en applications web fiables et sécurisées : API REST avec Django, interfaces React en TypeScript, authentification JWT et contrôle d’accès. Mon expérience en IT et en sécurité (EDR, authentification multifacteur) me pousse à penser sécurité dès la conception.',
    stackLabel: 'Stack principale',
    ctaProjects: 'Voir mes projets',
    scrollHint: 'Découvrir mes compétences',
    photoAlt: 'Portrait de',
  },
  skills: {
    eyebrow: '02 / compétences',
    title: 'Compétences techniques',
    description:
      'Une stack full-stack cohérente, complétée par une culture IT et sécurité. Les niveaux sont indiqués honnêtement : je préfère être précis plutôt qu’impressionnant.',
    legendLabel: 'Niveaux',
    levelProficient: 'À l’aise',
    levelIntermediate: 'Intermédiaire',
    levelFoundation: 'Bases solides',
    methodEyebrow: 'Ma méthode',
    methodTitle: 'L’IA comme assistant, jamais comme autorité',
    methodIntro:
      'Je suis titulaire d’une certification sur les fondamentaux de l’IA et de l’IA générative, et j’en connais aussi les limites : elle peut produire du code plausible mais faux. Je l’utilise comme un accélérateur, et je reste responsable de chaque ligne que je livre.',
    methodReviewTitle: 'Relire',
    methodReviewText:
      'Je lis et comprends chaque ligne générée avant de l’intégrer, puis je l’adapte à l’architecture du projet.',
    methodTestTitle: 'Tester',
    methodTestText:
      'Je vérifie le comportement réel (Postman, cas limites, erreurs) plutôt que de faire confiance à une réponse qui semble correcte.',
    methodSecureTitle: 'Sécuriser',
    methodSecureText:
      'Je contrôle systématiquement validation, authentification et droits d’accès, là où une suggestion automatique est la plus risquée.',
  },

    projects: {
    eyebrow: '03 / projects',
    title: 'Projects: études de cas',
    description:
      'Deux applications conçues et développées en autonomie. Pour chacune : le problème visé, la solution, les défis techniques rencontrés et la stack utilisée.',
    statusLive: 'Live · continuously updated',
    statusInProgress: 'In development',
    pwa: 'PWA',
    role: 'Role',
    duration: 'Duration',
    problem: 'Problem',
    solution: 'Solution',
    challenges: 'Technical challenges',
    stack: 'Tech stack',
    viewCode: 'Source code',
    viewDemo: 'Live demo',
    demoSoon: 'Demo coming soon',
    imageAlt: 'Preview of the project',
  },

    journey: {
    eyebrow: '04 / parcours',
    title: 'Parcours & certifications',
    description:
      'Une formation en génie logiciel, complétée par des expériences en IT et en sécurité. Le détail complet figure dans mon CV.',
    timelineLabel: 'Chronologie du parcours',
    current: 'En cours',
    kindEducation: 'Formation académique',
    kindExperience: 'Expérience',
    kindTraining: 'Formation certifiante',
    certificationsTitle: 'Certifications',
    cvLink: 'Voir le parcours complet (CV)',
  },

    contact: {
    eyebrow: '05 / contact',
    title: 'Travaillons ensemble',
    description:
      'Une opportunité, un stage, une mission freelance ou une question technique ? Écrivez-moi : je lis chaque message avec attention.',
    channelsTitle: 'Coordonnées directes',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Téléphone',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    whatsappMessage: 'Bonjour Yannick, je vous contacte depuis votre portfolio.',
    formTitle: 'Envoyer un message',
    nameLabel: 'Nom',
    namePlaceholder: 'Votre nom',
    emailFieldLabel: 'Email',
    emailPlaceholder: 'vous@exemple.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Décrivez votre besoin ou votre opportunité…',
    send: 'Envoyer le message',
    sending: 'Envoi en cours…',
    success: 'Message envoyé. Merci, je reviens vers vous dès que possible.',
    errorGeneric:
      'L’envoi a échoué. Réessayez ou écrivez-moi directement par email ou WhatsApp.',
    errorConfig:
      'Le formulaire n’est pas encore configuré. Écrivez-moi directement par email ou WhatsApp.',
    errorNetwork: 'Connexion impossible. Vérifiez votre réseau, puis réessayez.',
    errorNameRequired: 'Veuillez indiquer votre nom.',
    errorEmailInvalid: 'Veuillez saisir une adresse email valide.',
    errorMessageShort: 'Votre message doit contenir au moins 10 caractères.',
  },
  footer: {
    builtWith: 'Conçu et codé sans template avec',
    rights: 'Tous droits réservés.',
    backToTop: 'Retour en haut',
    socialLabel: 'Liens professionnels',
  },

} as const

export type Dictionary = {
  [Section in keyof typeof fr]: {
    [Key in keyof (typeof fr)[Section]]: string
  }
}

const en: Dictionary = {
  nav: {
    home: 'Home',
    skills: 'Skills',
    projects: 'Projects',
    journey: 'Journey',
    contact: 'Contact',
    downloadCv: 'Download my CV',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Switch language',
    mainNavigation: 'Main navigation',
  },
  hero: {
    availability: 'Available for jobs, internships & freelance',
    greeting: 'Hi, I’m',
    hook: 'Reliable web applications, designed with security from the very first line.',
    valueProposition:
      'I turn real-world needs into reliable, secure web applications: REST APIs with Django, React interfaces in TypeScript, JWT authentication and access control. My IT and security background (EDR, multi-factor authentication) means I think about security from the design stage.',
    stackLabel: 'Core stack',
    ctaProjects: 'View my projects',
    scrollHint: 'Explore my skills',
    photoAlt: 'Portrait of',
  },
  skills: {
    eyebrow: '02 / skills',
    title: 'Technical skills',
    description:
      'A coherent full-stack toolkit, backed by an IT and security mindset. Levels are stated honestly: I would rather be precise than impressive.',
    legendLabel: 'Levels',
    levelProficient: 'Proficient',
    levelIntermediate: 'Intermediate',
    levelFoundation: 'Solid foundations',
    methodEyebrow: 'My method',
    methodTitle: 'AI as an assistant, never as an authority',
    methodIntro:
      'I hold a certification in AI and generative AI fundamentals, and I also know its limits: it can produce plausible but wrong code. I use it as an accelerator, and I remain accountable for every line I ship.',
    methodReviewTitle: 'Review',
    methodReviewText:
      'I read and understand every generated line before integrating it, then adapt it to the project’s architecture.',
    methodTestTitle: 'Test',
    methodTestText:
      'I verify real behavior (Postman, edge cases, error paths) instead of trusting an answer that merely looks right.',
    methodSecureTitle: 'Secure',
    methodSecureText:
      'I systematically check validation, authentication and access rights, exactly where an automatic suggestion is riskiest.',
  },

    projects: {
    eyebrow: '03 / projects',
    title: 'Projects: case studies',
    description:
      'Two applications designed and built independently. For each: the problem, the solution, the technical challenges and the stack behind it.',
    statusLive: 'Live · continuously updated',
    statusInProgress: 'In development',
    pwa: 'PWA',
    role: 'Role',
    duration: 'Duration',
    problem: 'Problem',
    solution: 'Solution',
    challenges: 'Technical challenges',
    stack: 'Tech stack',
    viewCode: 'Source code',
    viewDemo: 'Live demo',
    demoSoon: 'Demo coming soon',
    imageAlt: 'Preview of the project',
  },

    journey: {
    eyebrow: '04 / journey',
    title: 'Journey & certifications',
    description:
      'A software engineering education, complemented by hands-on IT and security experience. The full details are in my CV.',
    timelineLabel: 'Journey timeline',
    current: 'Ongoing',
    kindEducation: 'Academic degree',
    kindExperience: 'Experience',
    kindTraining: 'Certified training',
    certificationsTitle: 'Certifications',
    cvLink: 'View the full journey (CV)',
  },

    contact: {
    eyebrow: '05 / contact',
    title: 'Let’s work together',
    description:
      'An opportunity, an internship, a freelance project or a technical question? Write to me: I read every message carefully.',
    channelsTitle: 'Direct contact',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Phone',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    whatsappMessage: 'Hello Yannick, I am contacting you from your portfolio.',
    formTitle: 'Send a message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailFieldLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Describe your need or opportunity…',
    send: 'Send message',
    sending: 'Sending…',
    success: 'Message sent. Thank you, I will get back to you as soon as possible.',
    errorGeneric:
      'Sending failed. Please try again or contact me directly by email or WhatsApp.',
    errorConfig:
      'The form is not configured yet. Please contact me directly by email or WhatsApp.',
    errorNetwork: 'Unable to connect. Check your network, then try again.',
    errorNameRequired: 'Please enter your name.',
    errorEmailInvalid: 'Please enter a valid email address.',
    errorMessageShort: 'Your message must be at least 10 characters long.',
  },
  footer: {
    builtWith: 'Designed and coded from scratch with',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
    socialLabel: 'Professional links',
  },
}

export const dictionary: Record<Language, Dictionary> = { fr, en }