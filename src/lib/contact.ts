export interface ContactFormValues {
  name: string
  email: string
  message: string
}

export type ContactField = keyof ContactFormValues

export type ContactErrorKey = 'errorNameRequired' | 'errorEmailInvalid' | 'errorMessageShort'

export type ContactFormErrors = Partial<Record<ContactField, ContactErrorKey>>

export type SendFailureReason = 'not-configured' | 'rejected' | 'network'

export type SendResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly reason: SendFailureReason }

export const MESSAGE_MIN_LENGTH = 10
export const MESSAGE_MAX_LENGTH = 2000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/** Validation côté client. Le service d'envoi revalide de son côté. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'errorNameRequired'
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'errorEmailInvalid'
  }
  if (values.message.trim().length < MESSAGE_MIN_LENGTH) {
    errors.message = 'errorMessageShort'
  }

  return errors
}

function isSuccessResponse(data: unknown): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    'success' in data &&
    data.success === true
  )
}

/** Envoie le message via Web3Forms (aucun backend personnel nécessaire). */
export async function sendContactMessage(values: ContactFormValues): Promise<SendResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
  if (accessKey === undefined || accessKey.trim() === '') {
    return { ok: false, reason: 'not-configured' }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'Nouveau message depuis le portfolio',
        from_name: values.name.trim(),
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      }),
    })

    const data: unknown = await response.json()
    return response.ok && isSuccessResponse(data)
      ? { ok: true }
      : { ok: false, reason: 'rejected' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}