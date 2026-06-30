export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-10">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-ink-muted">{description}</p>
      )}
    </div>
  )
}

export function DocCard({
  title,
  description,
  padded = true,
  children,
}: {
  title: string
  description?: string
  padded?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="border-b border-line bg-surface-subtle px-5 py-3.5">
        <p className="text-sm font-medium text-ink">{title}</p>
        {description && (
          <p className="mt-0.5 text-xs text-ink-muted">{description}</p>
        )}
      </div>
      <div className={padded ? 'p-5' : ''}>{children}</div>
    </div>
  )
}

export function Row({
  label,
  align = 'center',
  children,
}: {
  label: string
  align?: 'center' | 'start'
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-ink-subtle">{label}</p>
      <div
        className={`flex flex-wrap gap-3 ${align === 'start' ? 'items-start' : 'items-center'}`}
      >
        {children}
      </div>
    </div>
  )
}
