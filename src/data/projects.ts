import type { Project } from '@/types'

export const projects: readonly Project[] = [
  {
    id: 'buscamer',
    name: 'Buscamer',
    status: 'live',
    isPwa: false,
    summary: {
      fr: 'Plateforme de réservation de billets de bus en ligne, pensée pour le Cameroun et la sous-région.',
      en: 'Online bus ticket booking platform, built for Cameroon and the wider Central African region.',
    },
    role: {
      fr: 'Développeur unique : conception, API, interface et déploiement',
      en: 'Solo developer: design, API, interface and deployment',
    },
    duration: {
      fr: '6 mois, puis évolutions continues',
      en: '6 months, then continuous updates',
    },
    problem: {
      fr: 'Au Cameroun, la réservation et le paiement d’un billet de bus reposent sur les agences, sans coordination continue entre elles. Il manque une plateforme en ligne suffisamment robuste pour les voyageurs de tout le pays et de la sous-région.',
      en: 'In Cameroon, booking and paying for a bus ticket still depends on agencies, with no continuous coordination between them. There is no sufficiently robust online platform for travelers across the country and the wider region.',
    },
    solution: {
      fr: 'Une application web qui centralise la recherche de trajets, la sélection des sièges, le paiement et l’émission des tickets, avec des notifications au voyageur et un espace administrateur pour piloter l’activité.',
      en: 'A web application that centralizes trip search, seat selection, payment and ticket issuing, with traveler notifications and an admin area to manage operations.',
    },
    challenges: [
      {
        fr: 'Concurrence sur les sièges : empêcher que deux voyageurs réservent la même place au même moment, avec des transactions atomiques et un verrouillage au niveau de la base de données.',
        en: 'Seat concurrency: preventing two travelers from booking the same seat at the same time, using atomic transactions and database-level locking.',
      },
      {
        fr: 'Paiement mobile : intégrer un flux de paiement fiable et gérer les différents états d’une transaction (en attente, confirmée, échouée).',
        en: 'Mobile payment: integrating a reliable payment flow and handling the different states of a transaction (pending, confirmed, failed).',
      },
      {
        fr: 'Authentification : sécuriser l’accès avec JWT et séparer les droits des voyageurs et des administrateurs.',
        en: 'Authentication: securing access with JWT and separating traveler and administrator permissions.',
      },
      {
        fr: 'Performance : garder des recherches rapides et une interface fluide, y compris sur mobile.',
        en: 'Performance: keeping searches fast and the interface smooth, including on mobile devices.',
      },
    ],
    stack: ['React', 'Python', 'Django REST Framework', 'REST API', 'JWT', 'Vercel'],
    image: '/bus.jpg',
    githubUrl: 'https://github.com/kayannick/buscamer',
    demoUrl: 'https://buscamer.vercel.app/',
  },
  {
    id: 'appsante',
    name: 'AppSanté',
    status: 'in-progress',
    isPwa: true,
    summary: {
      fr: 'Application web progressive pour gérer ses rendez-vous et son suivi médical entre plusieurs hôpitaux.',
      en: 'Progressive web app to manage appointments and medical follow-up across multiple hospitals.',
    },
    role: {
      fr: 'Développeur unique : conception, API, interface et sécurité',
      en: 'Solo developer: design, API, interface and security',
    },
    duration: {
      fr: 'En cours',
      en: 'Ongoing',
    },
    problem: {
      fr: 'Les rendez-vous et les informations médicales sont dispersés entre plusieurs établissements, sans plateforme sécurisée qui permette au patient de s’y retrouver. Or, en santé, centraliser l’information n’a de sens que si la confidentialité est garantie.',
      en: 'Appointments and medical information are scattered across several facilities, with no secure platform that lets patients keep track. In healthcare, centralizing information only makes sense if confidentiality is guaranteed.',
    },
    solution: {
      fr: 'Une PWA pour rechercher des hôpitaux et des spécialistes, prendre rendez-vous, consulter son planning médical et recevoir des rappels et notifications. La sécurité est intégrée dès la conception : hachage, chiffrement, contrôle d’accès et QR code.',
      en: 'A PWA to find hospitals and specialists, book appointments, view a medical schedule and receive reminders and notifications. Security is built in from the start: hashing, encryption, access control and QR codes.',
    },
    challenges: [
      {
        fr: 'Données sensibles : chiffrer les informations, hacher les secrets et appliquer un contrôle d’accès strict pour que chaque utilisateur ne voie que ce qui le concerne.',
        en: 'Sensitive data: encrypting information, hashing secrets and enforcing strict access control so each user only sees what concerns them.',
      },
      {
        fr: 'Rappels fiables : planifier et envoyer les rappels de rendez-vous de façon asynchrone avec Celery, sans ralentir l’API.',
        en: 'Reliable reminders: scheduling and sending appointment reminders asynchronously with Celery, without slowing down the API.',
      },
      {
        fr: 'Expérience PWA : rendre l’application installable et agréable à utiliser sur mobile.',
        en: 'PWA experience: making the app installable and pleasant to use on mobile.',
      },
    ],
    stack: [
      'React',
      'PWA',
      'Python',
      'Django REST Framework',
      'JWT',
      'Celery',
      'Encryption',
      'Password hashing',
      'Access control',
      'QR code',
    ],
    image: '/app.jpg',
    githubUrl: 'https://github.com/kayannick/AppSante',
    demoUrl: null,
  },
]