import type { MouseEventHandler, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary'

interface BaseProps {
  readonly variant?: ButtonVariant
  readonly icon?: LucideIcon
  readonly children: ReactNode
  readonly className?: string
}

interface LinkButtonProps extends BaseProps {
  readonly href: string
  readonly download?: boolean
  /** Ouvre le lien dans un nouvel onglet, de façon sécurisée. */
  readonly external?: boolean
}

interface ActionButtonProps extends BaseProps {
  readonly href?: undefined
  readonly type?: 'button' | 'submit'
  readonly onClick?: MouseEventHandler<HTMLButtonElement>
  readonly disabled?: boolean
}

export type ButtonProps = LinkButtonProps | ActionButtonProps

const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:cursor-not-allowed disabled:opacity-50'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-r from-brand-cyan to-brand-violet text-slate-950 hover:shadow-lg hover:shadow-brand-cyan/25 hover:brightness-110',
  secondary:
    'border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md hover:border-brand-cyan/40 hover:bg-white/10',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', icon: Icon, children, className = '' } = props
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`

  const content = (
    <>
      {Icon !== undefined && <Icon className="size-4" aria-hidden="true" />}
      {children}
    </>
  )

  if (props.href !== undefined) {
    return (
      <a
        href={props.href}
        download={props.download}
        target={props.external === true ? '_blank' : undefined}
        rel={props.external === true ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  )
}