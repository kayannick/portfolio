import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { useTranslation } from '@/i18n/useTranslation'
import type { SectionId } from '@/types'
import { LanguageSwitcher } from './LanguageSwitcher'

/** Ordre d'affichage des liens. Les clés correspondent à celles de `t.nav`. */
const NAV_ITEMS = [
  'home',
  'skills',
  'projects',
  'journey',
  'contact',
] as const satisfies readonly SectionId[]

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan'

export function Navbar() {
  const { t } = useTranslation()
  const activeSection = useScrollSpy(NAV_ITEMS)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Ajoute le fond translucide dès que l'utilisateur quitte le haut de la page.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fermeture du menu mobile avec la touche Échap.
  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const headerClasses = isScrolled || isOpen
    ? 'border-white/10 bg-slate-950/70 shadow-lg shadow-black/20 backdrop-blur-md'
    : 'border-transparent bg-transparent'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${headerClasses}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo / marque personnelle */}
        <a
          href="#home"
          onClick={closeMenu}
          className={`rounded-md font-mono text-sm font-semibold tracking-tight text-white ${FOCUS_RING}`}
        >
          <span className="text-brand-cyan" aria-hidden="true">
            &lt;
          </span>
          KYD
          <span className="text-brand-violet" aria-hidden="true">
            {' '}
            /&gt;
          </span>
          <span className="sr-only">{profile.fullName}</span>
        </a>

        {/* Navigation desktop */}
        <nav aria-label={t.nav.mainNavigation} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((id) => {
              const isActive = id === activeSection
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-md px-3 py-2 font-mono text-sm transition-colors duration-200 ${FOCUS_RING} ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t.nav[id]}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-brand-cyan to-brand-violet transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Actions : langue, CV, menu mobile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          <a
            href={profile.cvPath}
            download
            className={`hidden items-center gap-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-violet px-4 py-2 text-sm font-semibold text-slate-950 transition-all duration-200 hover:shadow-lg hover:shadow-brand-cyan/25 hover:brightness-110 sm:inline-flex ${FOCUS_RING}`}
          >
            <Download className="size-4" aria-hidden="true" />
            {t.nav.downloadCv}
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
            className={`inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 md:hidden ${FOCUS_RING}`}
          >
            {isOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label={t.nav.mainNavigation}
          className="border-t border-white/10 bg-slate-950/90 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((id) => {
              const isActive = id === activeSection
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={closeMenu}
                    aria-current={isActive ? 'location' : undefined}
                    className={`block rounded-lg px-3 py-3 font-mono text-sm transition-colors ${FOCUS_RING} ${
                      isActive
                        ? 'bg-white/5 text-brand-cyan'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              )
            })}
            <li className="pt-2">
              <a
                href={profile.cvPath}
                download
                onClick={closeMenu}
                className={`flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-cyan to-brand-violet px-4 py-3 text-sm font-semibold text-slate-950 ${FOCUS_RING}`}
              >
                <Download className="size-4" aria-hidden="true" />
                {t.nav.downloadCv}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}