import { SectionTitle, DocCard } from '../doc-components'
import { a11yRows } from '../data'

export function AccessibilitySection() {
  return (
    <section>
      <SectionTitle
        eyebrow="Accessibility"
        title="Accessibility"
        description="All components target WCAG 2.1 AA as a baseline. The items below are enforced at the primitive level — not left to individual implementations."
      />
      <DocCard title="Requirements by category">
        <div className="overflow-hidden rounded-md border border-line divide-y divide-line">
          {a11yRows.map((row) => (
            <div key={row.topic} className="flex items-start gap-6 px-5 py-4">
              <span className="mt-px w-40 shrink-0 text-xs font-semibold text-ink">
                {row.topic}
              </span>
              <span className="text-xs leading-relaxed text-ink-muted">{row.detail}</span>
            </div>
          ))}
        </div>
      </DocCard>
    </section>
  )
}
