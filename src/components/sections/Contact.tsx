import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ComponentType } from 'react'
import { profile } from '@/data/profile'
import { useTranslation } from '@/i18n/useTranslation'
import { GitHubIcon } from '@/components/ui/GitHubIcon'
import { GlassCard } from '@/components/ui/GlassCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ContactForm } from './ContactForm'

interface ContactChannel {
  readonly label: string
  readonly value: string
  readonly href: string
  readonly icon: ComponentType<{ readonly className?: string }>
  readonly external: boolean
}

/** 237671775367 devient +237 671 775 367. */
function formatInternational(digits: string): string {
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function Contact() {
  const { t, l } = useTranslation()

  const whatsappHref = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(
    t.contact.whatsappMessage,
  )}`

  const channels: readonly ContactChannel[] = [
    {
      label: t.contact.emailLabel,
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: t.contact.whatsappLabel,
      value: formatInternational(profile.whatsappNumber),
      href: whatsappHref,
      icon: MessageCircle,
      external: true,
    },
    {
      label: t.contact.phoneLabel,
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, '')}`,
      icon: Phone,
      external: false,
    },
    {
      label: t.contact.githubLabel,
      value: stripProtocol(profile.github),
      href: profile.github,
      icon: GitHubIcon,
      external: true,
    },
    ...(profile.linkedin !== null
      ? [
          {
            label: t.contact.linkedinLabel,
            value: stripProtocol(profile.linkedin),
            href: profile.linkedin,
            icon: ExternalLink,
            external: true,
          } satisfies ContactChannel,
        ]
      : []),
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate scroll-mt-16 py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 size-96 rounded-full bg-brand-cyan/10 blur-3xl" />
        <div className="absolute top-1/4 -right-32 size-96 rounded-full bg-brand-violet/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Coordonnées directes */}
          <Reveal className="lg:col-span-2">
            <h3 className="font-mono text-sm tracking-wider text-slate-500 uppercase">
              {t.contact.channelsTitle}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {channels.map((channel) => {
                const Icon = channel.icon
                return (
                  <li key={channel.href}>
                    <a
                      href={channel.href}
                      target={channel.external ? '_blank' : undefined}
                      rel={channel.external ? 'noopener noreferrer' : undefined}
                      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all duration-200 hover:border-brand-cyan/40 hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-linear-to-br from-brand-cyan/20 to-brand-violet/20 text-brand-cyan"
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-xs text-slate-500">
                          {channel.label}
                        </span>
                        <span className="block truncate text-sm text-slate-100">
                          {channel.value}
                        </span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>

            <p className="mt-5 flex items-center gap-2 font-mono text-xs text-slate-500">
              <MapPin className="size-3.5" aria-hidden="true" />
              {l(profile.location)}
            </p>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={150} className="lg:col-span-3">
            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white">{t.contact.formTitle}</h3>
              <div className="mt-6">
                <ContactForm />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}