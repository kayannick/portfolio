import { useState, type CSSProperties } from 'react'
import { ArrowRight, ChevronDown, Download, MapPin } from 'lucide-react'
import { profile } from '@/data/profile'
import { useTranslation } from '@/i18n/useTranslation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CodeWindow } from '@/components/ui/CodeWindow'
import { Reveal } from '@/components/ui/Reveal'

const CORE_STACK: readonly string[] = [
  'Python',
  'Django REST',
  'React',
  'TypeScript',
  'PostgreSQL',
  'JWT',
]

/** Grille discrète en filigrane, estompée vers les bords. */
const GRID_STYLE: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
}

function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export function Hero() {
  const { t, l } = useTranslation()
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh scroll-mt-16 items-center overflow-hidden pt-24 pb-20"
    >
      {/* Décor : grille et halos lumineux */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={GRID_STYLE} />
        <div className="absolute -top-32 -left-24 size-96 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-md rounded-full bg-brand-violet/20 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10">
        {/* Colonne texte */}
        <div className="flex flex-col items-start">
          <Reveal>
            <Badge tone="cyan">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {t.hero.availability}
            </Badge>
          </Reveal>

          <Reveal delay={100} className="mt-8 flex items-center gap-4">
            {photoFailed ? (
              <div
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-cyan to-brand-violet font-mono text-sm font-bold text-slate-950 ring-2 ring-white/10"
              >
                {getInitials(profile.fullName)}
              </div>
            ) : (
              <img
                src={profile.photoPath}
                alt={`${t.hero.photoAlt} ${profile.fullName}`}
                width={56}
                height={56}
                decoding="async"
                onError={() => setPhotoFailed(true)}
                className="size-14 shrink-0 rounded-full object-cover ring-2 ring-brand-cyan/40"
              />
            )}
            <p className="font-mono text-sm text-slate-400">
              {t.hero.greeting}{' '}
              <span className="font-semibold text-slate-100">{profile.fullName}</span>
            </p>
          </Reveal>

          <Reveal delay={200}>
            <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              <span className="bg-linear-to-r from-brand-cyan to-brand-violet bg-clip-text text-transparent">
                {l(profile.role)}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-5 max-w-xl text-lg font-medium text-pretty text-slate-200 sm:text-xl">
              {t.hero.hook}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-slate-400">
              {t.hero.valueProposition}
            </p>
          </Reveal>

          <Reveal delay={400} className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="#projects" icon={ArrowRight}>
              {t.hero.ctaProjects}
            </Button>
            <Button href={profile.cvPath} download variant="secondary" icon={Download}>
              {t.nav.downloadCv}
            </Button>
          </Reveal>

          <Reveal delay={500} className="mt-10">
            <p className="font-mono text-xs tracking-wider text-slate-500 uppercase">
              {t.hero.stackLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {CORE_STACK.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 font-mono text-xs text-slate-500">
              <MapPin className="size-3.5" aria-hidden="true" />
              {l(profile.location)}
            </p>
          </Reveal>
        </div>

        {/* Colonne visuelle : éditeur de code animé */}
        <Reveal delay={300} className="w-full">
          <CodeWindow className="mx-auto w-full max-w-xl" />
        </Reveal>
      </div>

      {/* Indicateur de défilement */}
      <a
        href="#skills"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 rounded-md font-mono text-xs text-slate-500 transition-colors hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan sm:flex"
      >
        {t.hero.scrollHint}
        <ChevronDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  )
}