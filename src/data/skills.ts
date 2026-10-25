import type { SkillCategory } from '@/types'

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'frontend',
    title: { fr: 'Frontend', en: 'Frontend' },
    skills: [
      { name: 'HTML5', level: 'proficient' },
      { name: 'CSS3', level: 'proficient' },
      { name: 'JavaScript', level: 'intermediate' },
      { name: 'React', level: 'intermediate' },
      { name: 'Vite', level: 'intermediate' },
      { name: 'Tailwind CSS', level: 'intermediate' },
      { name: 'REST API consumption', level: 'intermediate' },
      { name: 'TypeScript', level: 'foundation' },
      { name: 'PWA', level: 'foundation' },
    ],
  },
  {
    id: 'backend',
    title: { fr: 'Backend & Données', en: 'Backend & Data' },
    skills: [
      { name: 'Python', level: 'intermediate' },
      { name: 'Django', level: 'intermediate' },
      { name: 'Django REST Framework', level: 'intermediate' },
      { name: 'REST API design', level: 'intermediate' },
      { name: 'JWT & sessions', level: 'intermediate' },
      { name: 'OAuth', level: 'foundation' },
      { name: 'Celery', level: 'foundation' },
      { name: 'SQL', level: 'intermediate' },
      { name: 'PostgreSQL', level: 'intermediate' },
      { name: 'MySQL', level: 'intermediate' },
      { name: 'Django ORM', level: 'intermediate' },
    ],
  },
  {
    id: 'tools',
    title: { fr: 'Outils & Sécurité', en: 'Tools & Security' },
    skills: [
      { name: 'Git & GitHub', level: 'intermediate' },
      { name: 'Postman', level: 'intermediate' },
      { name: 'Vercel', level: 'intermediate' },
      { name: 'Render', level: 'intermediate' },
      { name: 'Password hashing', level: 'intermediate' },
      { name: 'Input validation', level: 'intermediate' },
      { name: 'CORS', level: 'intermediate' },
      { name: 'RBAC', level: 'intermediate' },
      { name: 'Encryption', level: 'foundation' },
      { name: 'EDR & MFA (Okta Verify)', level: 'foundation' },
      { name: 'IT support & maintenance', level: 'intermediate' },
    ],
  },
]