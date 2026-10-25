import { useTranslation } from '@/i18n/useTranslation'
import type { Language } from '@/types'

const LANGUAGES: readonly Language[] = ['fr', 'en']

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 font-mono text-xs"
    >
      {LANGUAGES.map((code) => {
        const isActive = code === language
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={isActive}
            onClick={() => setLanguage(code)}
            className={`rounded-full px-2.5 py-1 font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan ${
              isActive
                ? 'bg-white/10 text-brand-cyan'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}