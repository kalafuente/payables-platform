import { SectionTitle, DocCard } from '../doc-components'
import { colorGroups, statusColors, typeScale, radii, systemIcons } from '../data'

export function FoundationsSection() {
  return (
    <>
      <section>
        <SectionTitle
          eyebrow="Foundations"
          title="Color"
          description="Semantic tokens via @theme. Reference by name — never raw hex. Each token generates bg-*, text-*, border-*, and ring-* utilities."
        />
        <div className="space-y-8">
          {colorGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-3 text-xs font-medium text-ink-muted">{group.label}</p>
              <div className="flex flex-wrap gap-4">
                {group.colors.map((c) => (
                  <div key={c.token} className="flex flex-col gap-1.5">
                    <div
                      className="h-10 w-[4.5rem] rounded-md border border-line"
                      style={{ backgroundColor: `var(${c.css})` }}
                    />
                    <p className="text-[11px] font-medium text-ink">{c.label}</p>
                    <p className="font-mono text-[11px] text-ink-subtle">{c.token}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-3 text-xs font-medium text-ink-muted">Status</p>
            <div className="flex flex-wrap gap-4">
              {statusColors.map((c) => (
                <div key={c.token} className="flex flex-col gap-1.5">
                  <div
                    className="flex h-10 w-[4.5rem] items-center justify-center rounded-md border border-line"
                    style={{ backgroundColor: `var(${c.bg})` }}
                  >
                    <span className="text-xs font-semibold" style={{ color: `var(${c.fg})` }}>
                      Aa
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-ink">{c.label}</p>
                  <p className="font-mono text-[11px] text-ink-subtle">{c.token}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Foundations"
          title="Typography"
          description="Geist Sans throughout. text-sm (14 px) is the default body size. Use font-mono tabular-nums for amounts and invoice numbers."
        />
        <div className="overflow-hidden rounded-lg border border-line bg-surface divide-y divide-line">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-baseline gap-8 px-5 py-4">
              <span className="w-12 shrink-0 font-mono text-[11px] text-ink-subtle">{t.name}</span>
              <span className={`${t.cls} text-ink`}>{t.sample}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Foundations"
          title="Radius"
          description="Named tokens for consistency. rounded-lg (0.5 rem) is the default for cards and controls. rounded-full for avatars."
        />
        <div className="flex flex-wrap items-end gap-8">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2.5">
              <div className={`${r.cls} size-12 border-2 border-primary bg-primary-subtle`} />
              <p className="font-mono text-[11px] text-ink-subtle">{r.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Foundations"
          title="Icons"
          description="Inline SVGs at 16 × 16 using currentColor. No icon library. Each lives inside the component that uses it; aria-hidden on all decorative instances."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {systemIcons.map((icon) => (
            <div
              key={icon.name}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3"
            >
              <span className="shrink-0 text-ink-muted">{icon.icon}</span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-ink">{icon.name}</p>
                <p className="truncate text-[11px] text-ink-subtle">{icon.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
