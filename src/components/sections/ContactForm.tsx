import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Check, LoaderCircle, Send, TriangleAlert } from 'lucide-react'
import {
  MESSAGE_MAX_LENGTH,
  sendContactMessage,
  validateContactForm,
  type ContactField,
  type ContactFormErrors,
  type ContactFormValues,
  type SendFailureReason,
} from '@/lib/contact'
import { useTranslation } from '@/i18n/useTranslation'
import { Button } from '@/components/ui/Button'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const EMPTY_VALUES: ContactFormValues = { name: '', email: '', message: '' }

const FAILURE_KEY = {
  'not-configured': 'errorConfig',
  rejected: 'errorGeneric',
  network: 'errorNetwork',
} as const satisfies Record<SendFailureReason, string>

const INPUT_CLASSES =
  'w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 transition-colors focus:border-brand-cyan/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/30 aria-[invalid=true]:border-red-400/60'

type FieldElement = HTMLInputElement | HTMLTextAreaElement

export function ContactForm() {
  const { t } = useTranslation()
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [failure, setFailure] = useState<SendFailureReason | null>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: ContactField) => (event: ChangeEvent<FieldElement>) => {
    const { value } = event.target
    setValues((previous) => ({ ...previous, [field]: value }))
    if (errors[field] !== undefined) {
      setErrors((previous) => ({ ...previous, [field]: undefined }))
    }
    if (status === 'success' || status === 'error') setStatus('idle')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (status === 'sending') return

    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    // Honeypot : un humain ne voit jamais ce champ. Si rempli, on simule un succès.
    if ((honeypotRef.current?.value ?? '') !== '') {
      setValues(EMPTY_VALUES)
      setStatus('success')
      return
    }

    setStatus('sending')
    setFailure(null)
    const result = await sendContactMessage(values)

    if (result.ok) {
      setValues(EMPTY_VALUES)
      setStatus('success')
    } else {
      setFailure(result.reason)
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <form
      noValidate
      onSubmit={(event) => {
        void handleSubmit(event)
      }}
      className="flex flex-col gap-5"
    >
      {/* Champ piège anti-bot, invisible pour les humains et les lecteurs d'écran */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input ref={honeypotRef} type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="contact-name" className="mb-2 block font-mono text-xs text-slate-400">
          {t.contact.nameLabel}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange('name')}
          placeholder={t.contact.namePlaceholder}
          aria-invalid={errors.name !== undefined}
          aria-describedby={errors.name !== undefined ? 'contact-name-error' : undefined}
          maxLength={100}
          className={INPUT_CLASSES}
        />
        {errors.name !== undefined && (
          <p id="contact-name-error" className="mt-2 text-xs text-red-300">
            {t.contact[errors.name]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block font-mono text-xs text-slate-400">
          {t.contact.emailFieldLabel}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={handleChange('email')}
          placeholder={t.contact.emailPlaceholder}
          aria-invalid={errors.email !== undefined}
          aria-describedby={errors.email !== undefined ? 'contact-email-error' : undefined}
          maxLength={254}
          className={INPUT_CLASSES}
        />
        {errors.email !== undefined && (
          <p id="contact-email-error" className="mt-2 text-xs text-red-300">
            {t.contact[errors.email]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block font-mono text-xs text-slate-400">
          {t.contact.messageLabel}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          placeholder={t.contact.messagePlaceholder}
          aria-invalid={errors.message !== undefined}
          aria-describedby={errors.message !== undefined ? 'contact-message-error' : undefined}
          maxLength={MESSAGE_MAX_LENGTH}
          className={`${INPUT_CLASSES} resize-y`}
        />
        {errors.message !== undefined && (
          <p id="contact-message-error" className="mt-2 text-xs text-red-300">
            {t.contact[errors.message]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" icon={isSending ? LoaderCircle : Send} disabled={isSending}>
          {isSending ? t.contact.sending : t.contact.send}
        </Button>

        {/* Zone annoncée aux lecteurs d'écran */}
        <div role="status" aria-live="polite" className="text-sm">
          {status === 'success' && (
            <p className="flex items-start gap-2 text-emerald-300">
              <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t.contact.success}
            </p>
          )}
          {status === 'error' && failure !== null && (
            <p className="flex items-start gap-2 text-red-300">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t.contact[FAILURE_KEY[failure]]}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}