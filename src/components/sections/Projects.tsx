import { useState } from 'react'
import {
  Clock,
  Code,
  ExternalLink,
  Lightbulb,
  Puzzle,
  Smartphone,
  Target,
  User,
} from 'lucide-react'
import { projects } from '@/data/projects'
import { useTranslation } from '@/i18n/useTranslation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Project } from '@/types'

interface ProjectMediaProps {
  readonly src: string
  readonly alt: string
}

/** Capture d'écran du projet, avec un visuel de remplacement si le fichier manque. */
function ProjectMedia({ src, alt }: ProjectMediaProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex aspect-video w-full items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-brand-cyan/10 to-brand-violet/10"
      >
        <Code className="size-10 text-slate-600" aria-hidden="true" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={800}
      height={450}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-video w-full rounded-xl border border-white/10 object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
    />
  )
}

interface ProjectCardProps {
  readonly project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const { t, l } = useTranslation()
  const isLive = project.status === 'live'

  return (
    <GlassCard as="article" className="p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        {/* Colonne gauche : visuel, métadonnées et technologies */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="overflow-hidden rounded-xl">
            <ProjectMedia src={project.image} alt={`${t.projects.imageAlt} ${project.name}`} />
          </div>

          <dl className="flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-start gap-3">
              <User className="mt-0.5 size-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <div>
                <dt className="text-slate-500">{t.projects.role}</dt>
                <dd className="mt-0.5 text-slate-300">{l(project.role)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-cyan" aria-hidden="true" />
              <div>
                <dt className="text-slate-500">{t.projects.duration}</dt>
                <dd className="mt-0.5 text-slate-300">{l(project.duration)}</dd>
              </div>
            </div>
          </dl>

          <div>
            <h4 className="font-mono text-xs tracking-wider text-slate-500 uppercase">
              {t.projects.stack}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne droite : étude de cas */}
        <div className="flex flex-col lg:col-span-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={isLive ? 'cyan' : 'violet'}>
              <span
                aria-hidden="true"
                className={`size-1.5 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`}
              />
              {isLive ? t.projects.statusLive : t.projects.statusInProgress}
            </Badge>
            {project.isPwa && (
              <Badge tone="violet">
                <Smartphone className="size-3" aria-hidden="true" />
                {t.projects.pwa}
              </Badge>
            )}
          </div>

          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 text-pretty text-slate-300">{l(project.summary)}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <section className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <h4 className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-100">
                <Target className="size-4 text-brand-cyan" aria-hidden="true" />
                {t.projects.problem}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{l(project.problem)}</p>
            </section>
            <section className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <h4 className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-100">
                <Lightbulb className="size-4 text-brand-violet" aria-hidden="true" />
                {t.projects.solution}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{l(project.solution)}</p>
            </section>
          </div>

          <section className="mt-6">
            <h4 className="flex items-center gap-2 font-mono text-sm font-semibold text-slate-100">
              <Puzzle className="size-4 text-brand-cyan" aria-hidden="true" />
              {t.projects.challenges}
            </h4>
            <ul className="mt-3 flex flex-col gap-3">
              {project.challenges.map((challenge) => (
                <li key={challenge.fr} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-linear-to-r from-brand-cyan to-brand-violet"
                  />
                  {l(challenge)}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={project.githubUrl} external icon={Code}>
              {t.projects.viewCode}
            </Button>
            {project.demoUrl !== null ? (
              <Button href={project.demoUrl} external variant="secondary" icon={ExternalLink}>
                {t.projects.viewDemo}
              </Button>
            ) : (
              <Button variant="secondary" icon={ExternalLink} disabled>
                {t.projects.demoSoon}
              </Button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

export function Projects() {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative isolate scroll-mt-16 py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -right-32 size-96 rounded-full bg-brand-cyan/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            id="projects-title"
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            description={t.projects.description}
          />
        </Reveal>

        <ul className="mt-12 flex flex-col gap-10">
          {projects.map((project) => (
            <li key={project.id}>
              <Reveal>
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}