import {
  Award,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { certifications, journeyItems } from '@/data/journey'
import { profile } from '@/data/profile'
import { useTranslation } from '@/i18n/useTranslation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { JourneyKind } from '@/types'

const KIND_ICONS: Record<JourneyKind, LucideIcon> = {
  education: GraduationCap,
  experience: Briefcase,
  training: BookOpen,
}

const KIND_LABEL_KEY = {
  education: 'kindEducation',
  experience: 'kindExperience',
  training: 'kindTraining',
} as const satisfies Record<JourneyKind, string>

export function Journey() {
  const { t, l } = useTranslation()

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative isolate scroll-mt-16 py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 size-96 rounded-full bg-brand-violet/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            id="journey-title"
            eyebrow={t.journey.eyebrow}
            title={t.journey.title}
            description={t.journey.description}
          />
        </Reveal>

        {/* Timeline verticale */}
        <ol
          aria-label={t.journey.timelineLabel}
          className="relative mt-12 ml-2 border-l border-white/10 sm:ml-4"
        >
          {journeyItems.map((item) => {
            const Icon = KIND_ICONS[item.kind]
            return (
              <li key={item.id} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
                {/* Point de la timeline */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-0 flex size-3.5 -translate-x-1/2 items-center justify-center"
                >
                  {item.isCurrent && (
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                  )}
                  <span
                    className={`relative size-3.5 rounded-full border-2 border-slate-950 ${
                      item.isCurrent
                        ? 'bg-emerald-400'
                        : 'bg-linear-to-r from-brand-cyan to-brand-violet'
                    }`}
                  />
                </span>

                <Reveal>
                  <GlassCard className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-medium text-brand-cyan">
                        {l(item.period)}
                      </span>
                      {item.isCurrent && <Badge tone="cyan">{t.journey.current}</Badge>}
                      <span className="flex items-center gap-1.5 font-mono text-xs text-slate-500">
                        <Icon className="size-3.5" aria-hidden="true" />
                        {t.journey[KIND_LABEL_KEY[item.kind]]}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold text-white sm:text-xl">
                      {l(item.title)}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-slate-400">{item.organization}</p>
                    <p className="mt-3 leading-relaxed text-pretty text-slate-400">
                      {l(item.description)}
                    </p>

                    {item.highlights.length > 0 && (
                      <ul className="mt-4 flex flex-col gap-2">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight.fr}
                            className="flex gap-3 text-sm leading-relaxed text-slate-300"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-linear-to-r from-brand-cyan to-brand-violet"
                            />
                            {l(highlight)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlassCard>
                </Reveal>
              </li>
            )
          })}
        </ol>

        {/* Certifications */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-mono text-sm tracking-wider text-slate-500 uppercase">
              {t.journey.certificationsTitle}
            </h3>
          </Reveal>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {certifications.map((certification, index) => {
              const meta = [certification.issuer, certification.year].filter(
                (value): value is string => value !== null,
              )
              return (
                <li key={certification.id}>
                  <Reveal delay={index * 120} className="h-full">
                    <GlassCard className="flex h-full items-start gap-4 p-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-brand-cyan/20 to-brand-violet/20 text-brand-cyan">
                        <Award className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-100">{l(certification.name)}</p>
                        {meta.length > 0 && (
                          <p className="mt-1 font-mono text-xs text-slate-500">
                            {meta.join(' · ')}
                          </p>
                        )}
                      </div>
                    </GlassCard>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>

        <Reveal className="mt-10">
          <Button href={profile.cvPath} download variant="secondary" icon={FileText}>
            {t.journey.cvLink}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}