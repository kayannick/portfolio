interface SectionHeadingProps {
  /** Identifiant du titre, référencé par aria-labelledby sur la section. */
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-sm text-brand-cyan">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl"
      >
        {title}
      </h2>
      {description !== undefined && (
        <p className="mt-4 leading-relaxed text-pretty text-slate-400">{description}</p>
      )}
    </div>
  )
}