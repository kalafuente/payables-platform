'use client'

// Internal design system reference. Not linked from the app.

import { FoundationsSection } from './sections/foundations'
import { ComponentsSection } from './sections/components'
import { FormsSection } from './sections/forms'
import { FeedbackSection } from './sections/feedback'
import { MotionSection } from './sections/motion'
import { AccessibilitySection } from './sections/accessibility'
import { PatternsSection } from './sections/patterns'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-canvas">

      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-8 py-16">
          <div className="flex items-start justify-between gap-12">
            <div className="max-w-xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">
                Internal · v0.1.0
              </p>
              <h1 className="text-display font-semibold tracking-tight text-ink">
                Payables<br />Design System
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                A lightweight, purpose-built component library for the Accounts Payable product.
                Tokens, components, and patterns designed to serve clarity over cleverness.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {[
                  { title: 'Consistent',   body: 'Shared tokens across every surface — no magic numbers.' },
                  { title: 'Accessible',   body: 'Contrast, focus rings, and ARIA built into each primitive.' },
                  { title: 'Composable',   body: 'Primitives compose into patterns — no one-off components.' },
                ].map((p) => (
                  <div key={p.title}>
                    <p className="text-sm font-semibold text-ink">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="space-y-px overflow-hidden rounded-lg border border-line">
                {[
                  { label: 'Framework', value: 'Next.js 16 · App Router' },
                  { label: 'Styles',    value: 'Tailwind CSS v4'          },
                  { label: 'Animation', value: 'Framer Motion'            },
                  { label: 'Language',  value: 'TypeScript'               },
                  { label: 'Database',  value: 'Prisma · PostgreSQL'      },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-4 bg-surface px-4 py-2.5">
                    <span className="w-20 shrink-0 text-xs text-ink-subtle">{row.label}</span>
                    <span className="text-xs font-medium text-ink">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-28 px-8 py-16">
        <FoundationsSection />
        <ComponentsSection />
        <FormsSection />
        <FeedbackSection />
        <MotionSection />
        <AccessibilitySection />
        <PatternsSection />
      </div>

    </div>
  )
}
