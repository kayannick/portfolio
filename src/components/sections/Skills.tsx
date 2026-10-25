import {
  FlaskConical,
  Monitor,
  SearchCheck,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { skillCategories } from '@/data/skills'
import { useTranslation } from '@/i18n/useTranslation'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { SkillCategoryId, SkillLevel } from '@/types'

const CATEGORY_ICONS: Record<SkillCategoryId, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  tools: ShieldCheck,
}

const LEVEL_RANK: Record<SkillLevel, number> = {
  proficient: 3,
  intermediate: 2,
  foundation: 1,
}

const LEVEL_LABEL_KEY = {
  proficient: 'levelProficient',
  intermediate: 'levelIntermediate',
  foundation: 'levelFoundation',
} as const satisfies Record<SkillLevel, string>

const LEVELS_IN_ORDER: readonly SkillLevel[] = ['proficient', 'intermediate', 'foundation']

function LevelBars({ level }: { readonly level: SkillLevel }) {
  const rank = LEVEL_RANK[level]
  return (
    <span aria-hidden="true" className="flex gap-0.5">
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={`h-1.5 w-3 rounded-full ${
            step <= rank ? 'bg-linear-to-r from-brand-cyan to-brand-violet' : 'bg-white/10'
          }`}
        />
      ))}
    </span>
  )
}

export function Skills() {
  const { t, l } = useTranslation()

  const methodPillars: readonly {
    readonly icon: LucideIcon
    readonly title: string
    readonly text: string
  }[] = [
    { icon: SearchCheck, title: t.skills.methodReviewTitle, text: t.skills.methodReviewText },
    { icon: FlaskConical, title: t.skills.methodTestTitle, text: t.skills.methodTestText },
    { icon: ShieldCheck, title: t.skills.methodSecureTitle, text: t.skills.methodSecureText },
  ]

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative isolate scroll-mt-16 py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 size-96 rounded-full bg-brand-violet/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            description={t.skills.description}
          />
        </Reveal>

        {/* Légende des niveaux */}
        <Reveal delay={100} className="mt-8">
          <ul
            aria-label={t.skills.legendLabel}
            className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-slate-400"
          >
            {LEVELS_IN_ORDER.map((level) => (
              <li key={level} className="flex items-center gap-2">
                <LevelBars level={level} />
                {t.skills[LEVEL_LABEL_KEY[level]]}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Grille des catégories */}
        <ul className="mt-8 grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.id]
            return (
              <li key={category.id}>
                <Reveal delay={index * 120} className="h-full">
                  <GlassCard className="h-full">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-brand-cyan/20 to-brand-violet/20 text-brand-cyan">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{l(category.title)}</h3>
                    </div>

                    <ul className="mt-6 flex flex-col gap-2">
                      {category.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/3 px-3 py-2 font-mono text-xs text-slate-200 transition-colors hover:border-white/15"
                        >
                          <span>{skill.name}</span>
                          <span className="flex shrink-0 items-center gap-2">
                            <LevelBars level={skill.level} />
                            <span className="sr-only">{t.skills[LEVEL_LABEL_KEY[skill.level]]}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              </li>
            )
          })}
        </ul>

        {/* Encart « Ma méthode » */}
        <Reveal delay={150} className="mt-10">
          <GlassCard className="border-brand-violet/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 font-mono text-sm text-brand-violet">
              <Sparkles className="size-4" aria-hidden="true" />
              {t.skills.methodEyebrow}
            </div>
            <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
              {t.skills.methodTitle}
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-pretty text-slate-400">
              {t.skills.methodIntro}
            </p>

            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {methodPillars.map(({ icon: PillarIcon, title, text }) => (
                <li
                  key={title}
                  className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
                >
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <PillarIcon className="size-4 text-brand-cyan" aria-hidden="true" />
                    {title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  )
}