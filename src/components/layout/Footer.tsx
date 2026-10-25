import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '@/data/profile'
import { useTranslation } from '@/i18n/useTranslation'
import { Badge } from '@/components/ui/Badge'
import { GitHubIcon } from '@/components/ui/GitHubIcon'

const BUILT_WITH: readonly string[] = ['React', 'TypeScript', 'Tailwind CSS', 'Vite']

const LINK_CLASSES =
  'inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-brand-cyan/40 hover:text-brand-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan'

export function Footer() {
  const { t, l } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold text-white">
            <span className="text-brand-cyan" aria-hidden="true">
              &lt;
            </span>
            {profile.fullName}
            <span className="text-brand-violet" aria-hidden="true">
              {' '}
              /&gt;
            </span>
          </p>
          <p className="mt-1 text-sm text-slate-500">{l(profile.role)}</p>
        </div>

        <div>
          <p className="font-mono text-xs text-slate-500">{t.footer.builtWith}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {BUILT_WITH.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t.footer.socialLabel}>
          <ul className="flex items-center gap-3">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contact.githubLabel}
                className={LINK_CLASSES}
              >
                <GitHubIcon className="size-5" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label={t.contact.emailLabel}
                className={LINK_CLASSES}
              >
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="#home" aria-label={t.footer.backToTop} className={LINK_CLASSES}>
                <ArrowUp className="size-5" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/5 py-4 text-center font-mono text-xs text-slate-600">
        © {year} {profile.fullName}. {t.footer.rights}
      </div>
    </footer>
  )
}