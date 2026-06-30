'use client'

/**
 * Internal design system documentation. Not linked from the application.
 */

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { SearchInput } from '@/components/ui/search-input'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import { useToast } from '@/components/ui/toaster'

// ─────────────────────────────────────────────────────────────────────────────
// Layout primitives
// ─────────────────────────────────────────────────────────────────────────────

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8">
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

function DocCard({
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

function Row({
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

// ─────────────────────────────────────────────────────────────────────────────
// Interactive demos
// ─────────────────────────────────────────────────────────────────────────────

function LoadingDemo({
  variant = 'primary',
  label,
  loadingLabel,
}: {
  variant?: 'accent' | 'primary' | 'danger'
  label: string
  loadingLabel: string
}) {
  const [loading, setLoading] = useState(false)
  function trigger() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }
  return (
    <Button variant={variant} loading={loading} onClick={trigger}>
      {loading ? loadingLabel : label}
    </Button>
  )
}

function SearchDemo({
  placeholder,
  className,
}: {
  placeholder?: string
  className?: string
}) {
  const [value, setValue] = useState('')
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder={placeholder ?? 'Search…'}
      className={className}
    />
  )
}

function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast({
              variant: 'success',
              title: 'Bill created',
              description: 'The invoice has been saved as a draft.',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast({
              variant: 'info',
              title: 'Syncing vendor data',
              description: 'Records are being updated in the background.',
            })
          }
        >
          Info
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast({
              variant: 'warning',
              title: 'Payment may be delayed',
              description: 'Bank processing times are extended this week.',
            })
          }
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            toast({
              variant: 'error',
              title: 'Could not create bill',
              description: 'A bill with this invoice number already exists.',
            })
          }
        >
          Error
        </Button>
      </div>
      <p className="text-xs text-ink-subtle">
        Toasts auto-dismiss after 4.5 s. Click × to dismiss early.
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Foundation data
// ─────────────────────────────────────────────────────────────────────────────

const colorGroups = [
  {
    label: 'Surfaces',
    colors: [
      { token: 'canvas',         label: 'Canvas',         css: '--color-canvas',         dark: false },
      { token: 'surface',        label: 'Surface',        css: '--color-surface',        dark: false },
      { token: 'surface-subtle', label: 'Surface Subtle', css: '--color-surface-subtle', dark: false },
      { token: 'sidebar',        label: 'Sidebar',        css: '--color-sidebar',        dark: false },
    ],
  },
  {
    label: 'Text',
    colors: [
      { token: 'ink',          label: 'Ink',          css: '--color-ink',          dark: true  },
      { token: 'ink-muted',    label: 'Ink Muted',    css: '--color-ink-muted',    dark: true  },
      { token: 'ink-subtle',   label: 'Ink Subtle',   css: '--color-ink-subtle',   dark: false },
      { token: 'ink-disabled', label: 'Ink Disabled', css: '--color-ink-disabled', dark: false },
    ],
  },
  {
    label: 'Borders',
    colors: [
      { token: 'line',        label: 'Line',        css: '--color-line',        dark: false },
      { token: 'line-strong', label: 'Line Strong', css: '--color-line-strong', dark: false },
    ],
  },
  {
    label: 'Brand',
    colors: [
      { token: 'primary', label: 'Primary', css: '--color-primary', dark: true  },
      { token: 'accent',  label: 'Accent',  css: '--color-accent',  dark: false },
      { token: 'danger',  label: 'Danger',  css: '--color-danger',  dark: true  },
    ],
  },
]

const statusColors = [
  { token: 'draft',     label: 'Draft',     bg: '--color-draft-bg',     fg: '--color-draft'     },
  { token: 'pending',   label: 'Pending',   bg: '--color-pending-bg',   fg: '--color-pending'   },
  { token: 'approved',  label: 'Approved',  bg: '--color-approved-bg',  fg: '--color-approved'  },
  { token: 'scheduled', label: 'Scheduled', bg: '--color-scheduled-bg', fg: '--color-scheduled' },
  { token: 'overdue',   label: 'Overdue',   bg: '--color-overdue-bg',   fg: '--color-overdue'   },
]

const typeScale = [
  { name: 'display', cls: 'text-display font-semibold tracking-tight', sample: 'Display' },
  { name: '2xl',     cls: 'text-2xl font-semibold',                    sample: 'Heading 2XL' },
  { name: 'xl',      cls: 'text-xl font-semibold',                     sample: 'Heading XL' },
  { name: 'lg',      cls: 'text-lg font-medium',                       sample: 'Heading LG' },
  { name: 'base',    cls: 'text-base',                                  sample: 'Base — default paragraph size (16px)' },
  { name: 'sm',      cls: 'text-sm',                                    sample: 'Small — default UI label size (14px)' },
  { name: 'xs',      cls: 'text-xs',                                    sample: 'Extra small — captions and metadata (12px)' },
  { name: '2xs',     cls: 'text-2xs',                                   sample: 'Two extra small — overlines (11px)' },
]

const radii = [
  { name: 'xs',   cls: 'rounded-xs'   },
  { name: 'sm',   cls: 'rounded-sm'   },
  { name: 'md',   cls: 'rounded-md'   },
  { name: 'lg',   cls: 'rounded-lg'   },
  { name: 'xl',   cls: 'rounded-xl'   },
  { name: '2xl',  cls: 'rounded-2xl'  },
  { name: 'full', cls: 'rounded-full' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Mock data
// ─────────────────────────────────────────────────────────────────────────────

const lineItems = [
  { description: 'Software infrastructure', qty: 1, amount: 9_800 },
  { description: 'API usage fees',          qty: 1, amount: 1_200 },
  { description: 'Support & maintenance',   qty: 1, amount:   500 },
]

const bills: {
  id: string
  vendor: string
  invoice: string
  amount: number
  due: string
  status: BadgeVariant
  label: string
}[] = [
  { id: '1', vendor: 'Stripe, Inc.',         invoice: 'INV-0834', amount: 11_500, due: 'Jan 15, 2026', status: 'pending',   label: 'Pending Approval' },
  { id: '2', vendor: 'Amazon Web Services',  invoice: 'INV-0833', amount:  8_240, due: 'Jan 20, 2026', status: 'approved',  label: 'Approved'         },
  { id: '3', vendor: 'Figma',               invoice: 'INV-0832', amount:  6_000, due: 'Dec 31, 2025', status: 'overdue',   label: 'Overdue'          },
  { id: '4', vendor: 'Vercel',              invoice: 'INV-0831', amount:  2_400, due: 'Jan 30, 2026', status: 'scheduled', label: 'Scheduled'        },
  { id: '5', vendor: 'Notion',              invoice: 'INV-0830', amount:  1_200, due: 'Jan 10, 2026', status: 'paid',      label: 'Paid'             },
]

function usd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

// ─────────────────────────────────────────────────────────────────────────────
// Icons used in the system (inline SVGs, 16 × 16)
// ─────────────────────────────────────────────────────────────────────────────

const systemIcons: { name: string; usage: string; svg: React.ReactNode }[] = [
  {
    name: 'Search',
    usage: 'SearchInput',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <circle cx="6.5" cy="6.5" r="4" />
        <path d="M11 11l3 3" />
      </svg>
    ),
  },
  {
    name: 'CheckCircle',
    usage: 'Toast success',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M5 8.5 7 10.5 11 6" />
      </svg>
    ),
  },
  {
    name: 'InfoCircle',
    usage: 'Toast info',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 5v0" strokeWidth="2.5" />
        <line x1="8" y1="7.5" x2="8" y2="11" />
      </svg>
    ),
  },
  {
    name: 'Warning',
    usage: 'Toast warning',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M8 3 14 13H2L8 3z" />
        <line x1="8" y1="7" x2="8" y2="9.5" />
        <path d="M8 11.5v0" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: 'XCircle',
    usage: 'Toast error',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M6 6l4 4M10 6l-4 4" />
      </svg>
    ),
  },
  {
    name: 'Spinner',
    usage: 'Button loading',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" className="size-4 animate-spin">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Chevron',
    usage: 'Select',
    svg: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M4 6l4 4 4-4" />
      </svg>
    ),
  },
  {
    name: 'StatusDot',
    usage: 'Badge',
    svg: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="size-3">
        <circle cx="8" cy="8" r="3" />
      </svg>
    ),
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-canvas">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto max-w-5xl px-8 py-16">
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
                Every token, component, and pattern is designed to serve clarity over cleverness.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-line pt-8">
                {[
                  { title: 'Consistent', body: 'Shared design tokens flow across every surface — no magic numbers.' },
                  { title: 'Accessible', body: 'Color contrast, focus rings, and ARIA roles are built into each primitive.' },
                  { title: 'Composable', body: 'Primitives compose into patterns. No one-off components.' },
                ].map((p) => (
                  <div key={p.title}>
                    <p className="text-sm font-semibold text-ink">{p.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="space-y-px overflow-hidden rounded-lg border border-line text-sm">
                {[
                  { label: 'Framework',  value: 'Next.js 16 · App Router' },
                  { label: 'Styles',     value: 'Tailwind CSS v4'         },
                  { label: 'Animation',  value: 'Framer Motion'           },
                  { label: 'Language',   value: 'TypeScript'              },
                  { label: 'Database',   value: 'Prisma · PostgreSQL'     },
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

      <div className="mx-auto max-w-5xl space-y-24 px-8 py-16">

        {/* ══════════════════════════════════════════════════════════════════════
            FOUNDATIONS
        ══════════════════════════════════════════════════════════════════════ */}

        {/* Color */}
        <section>
          <SectionTitle
            eyebrow="Foundations"
            title="Color"
            description="Semantic tokens defined with Tailwind v4's @theme directive. Always reference tokens by name — never raw hex. Each token generates bg-*, text-*, border-*, and ring-* utilities."
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
                      <span
                        className="text-xs font-semibold"
                        style={{ color: `var(${c.fg})` }}
                      >
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

        {/* Typography */}
        <section>
          <SectionTitle
            eyebrow="Foundations"
            title="Typography"
            description="Geist Sans for all UI text. text-sm (14 px) is the default body size. Use font-mono tabular-nums for amounts, invoice numbers, and any data that benefits from fixed-width numerals."
          />
          <div className="overflow-hidden rounded-lg border border-line bg-surface divide-y divide-line">
            {typeScale.map((t) => (
              <div key={t.name} className="flex items-baseline gap-6 px-5 py-4">
                <span className="w-12 shrink-0 font-mono text-[11px] text-ink-subtle">
                  {t.name}
                </span>
                <span className={`${t.cls} text-ink`}>{t.sample}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Radius */}
        <section>
          <SectionTitle
            eyebrow="Foundations"
            title="Radius"
            description="Named radius tokens keep corners consistent. rounded-lg (0.5 rem) is the default for cards, panels, and input controls. rounded-full is reserved for avatars and pill badges."
          />
          <div className="flex flex-wrap items-end gap-6">
            {radii.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2.5">
                <div
                  className={`${r.cls} size-12 border-2 border-primary bg-primary-subtle`}
                />
                <p className="font-mono text-[11px] text-ink-subtle">{r.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Icons */}
        <section>
          <SectionTitle
            eyebrow="Foundations"
            title="Icons"
            description="All icons are inline SVGs — no icon library dependency. Each is sized at 16 × 16, uses currentColor, and is aria-hidden. They live inside the component that uses them and are not exported separately."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {systemIcons.map((icon) => (
              <div
                key={icon.name}
                className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3"
              >
                <span className="shrink-0 text-ink-muted">{icon.svg}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-ink">{icon.name}</p>
                  <p className="truncate text-[11px] text-ink-subtle">{icon.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            COMPONENTS
        ══════════════════════════════════════════════════════════════════════ */}

        {/* Button */}
        <section>
          <SectionTitle
            eyebrow="Components"
            title="Button"
            description="Five semantic variants mapped to intent. Accent is the highest-emphasis action on any given screen and should appear at most once per view. Primary is the default action. Ghost and secondary support secondary actions without competing for attention."
          />
          <div className="space-y-4">
            <DocCard
              title="Variants"
              description="Pick the variant that matches the action's importance relative to others on the same surface."
            >
              <Row label="All variants — medium size">
                <Button variant="accent">Accent</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </Row>
            </DocCard>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DocCard
                title="Sizes"
                description="sm for dense toolbars, md default, lg for prominent standalone CTAs."
              >
                <div className="space-y-4">
                  <Row label="Primary variant">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </Row>
                  <Row label="Secondary variant">
                    <Button variant="secondary" size="sm">Small</Button>
                    <Button variant="secondary" size="md">Medium</Button>
                    <Button variant="secondary" size="lg">Large</Button>
                  </Row>
                </div>
              </DocCard>

              <DocCard
                title="States"
                description="Loading disables the button and shows a spinner. Click to preview the 2-second loading cycle."
              >
                <div className="space-y-4">
                  <Row label="Loading — click to trigger">
                    <LoadingDemo variant="accent"  label="New Bill"     loadingLabel="Creating…"  />
                    <LoadingDemo variant="primary" label="Approve Bill" loadingLabel="Approving…" />
                    <LoadingDemo variant="danger"  label="Reject Bill"  loadingLabel="Rejecting…" />
                  </Row>
                  <Row label="Disabled">
                    <Button variant="accent"    disabled>Accent</Button>
                    <Button variant="primary"   disabled>Primary</Button>
                    <Button variant="secondary" disabled>Secondary</Button>
                    <Button variant="danger"    disabled>Danger</Button>
                  </Row>
                </div>
              </DocCard>
            </div>

            <DocCard
              title="In context — page toolbar"
              description="Accent for the page's primary CTA. Secondary and ghost for supporting actions. Never two accent buttons on the same surface."
            >
              <div className="flex items-center justify-between rounded-lg border border-line bg-canvas px-5 py-3.5">
                <p className="text-sm font-semibold text-ink">Bills</p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Export</Button>
                  <Button variant="secondary" size="sm">Filters</Button>
                  <Button variant="accent" size="sm">New Bill</Button>
                </div>
              </div>
            </DocCard>
          </div>
        </section>

        {/* Badge */}
        <section>
          <SectionTitle
            eyebrow="Components"
            title="Badge"
            description="Status indicators for the bill lifecycle. Each variant maps to a semantic color pair — foreground text on a tinted background. Badges are read-only; they never trigger actions."
          />
          <div className="space-y-4">
            <DocCard title="All variants">
              <div className="flex flex-wrap gap-2">
                <Badge variant="draft">Draft</Badge>
                <Badge variant="pending">Pending Approval</Badge>
                <Badge variant="approved">Approved</Badge>
                <Badge variant="scheduled">Scheduled</Badge>
                <Badge variant="paid">Paid</Badge>
                <Badge variant="overdue">Overdue</Badge>
                <Badge variant="default">Default</Badge>
              </div>
            </DocCard>

            <DocCard
              title="Inline with content"
              description="Badges sit next to vendor names in list rows. They should never be the only affordance for an action."
            >
              <div className="space-y-2">
                {bills.map((bill) => (
                  <div key={bill.id} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span>{bill.vendor}</span>
                    <Badge variant={bill.status}>{bill.label}</Badge>
                  </div>
                ))}
              </div>
            </DocCard>
          </div>
        </section>

        {/* Card */}
        <section>
          <SectionTitle
            eyebrow="Components"
            title="Card"
            description="A surface primitive that groups related content. Cards use a subtle border, soft shadow, and bg-surface to lift content off the canvas. Divide internal sections with border-line, not padding alone."
          />
          <div className="space-y-4">
            <DocCard
              title="Metric cards"
              description="Dashboard KPI cards. Use a large tabular number for the primary value, a badge or label for context."
            >
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-5">
                  <p className="text-xs font-medium text-ink-muted">To Approve</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">7</p>
                  <div className="mt-2">
                    <Badge variant="overdue">3 overdue</Badge>
                  </div>
                </Card>
                <Card className="p-5">
                  <p className="text-xs font-medium text-ink-muted">Due This Week</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-ink">
                    $48,250
                  </p>
                  <p className="mt-2 text-xs text-ink-subtle">5 bills</p>
                </Card>
                <Card className="p-5">
                  <p className="text-xs font-medium text-ink-muted">Paid This Month</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-ink">
                    $128,450
                  </p>
                  <p className="mt-2 text-xs text-ink-subtle">14 bills</p>
                </Card>
              </div>
            </DocCard>

            <DocCard
              title="Bill detail card"
              description="Header, line-item table, total footer, and action row — all sectioned inside a single Card with overflow-hidden."
              padded={false}
            >
              <div className="p-5">
                <Card className="max-w-xl overflow-hidden">
                  <div className="flex items-start justify-between border-b border-line px-6 py-5">
                    <div>
                      <p className="text-sm font-semibold text-ink">Stripe, Inc.</p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        INV-2025-0834 · Due Jan 15, 2026
                      </p>
                    </div>
                    <Badge variant="pending">Pending Approval</Badge>
                  </div>
                  <div className="px-6 py-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-line">
                          <th className="pb-2.5 text-left text-xs font-medium text-ink-muted">Description</th>
                          <th className="pb-2.5 text-center text-xs font-medium text-ink-muted w-12">Qty</th>
                          <th className="pb-2.5 text-right text-xs font-medium text-ink-muted">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {lineItems.map((item) => (
                          <tr key={item.description}>
                            <td className="py-3 text-sm text-ink">{item.description}</td>
                            <td className="py-3 text-center text-sm text-ink-muted">{item.qty}</td>
                            <td className="py-3 text-right font-mono tabular-nums text-sm text-ink">
                              {usd(item.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between border-t border-line bg-surface-subtle px-6 py-4">
                    <p className="text-sm font-medium text-ink-muted">Total</p>
                    <p className="font-mono tabular-nums text-base font-semibold text-ink">
                      {usd(lineItems.reduce((s, i) => s + i.amount, 0))}
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 border-t border-line px-6 py-4">
                    <Button variant="secondary" size="sm">Request changes</Button>
                    <Button variant="danger" size="sm">Reject</Button>
                    <Button size="sm">Approve</Button>
                  </div>
                </Card>
              </div>
            </DocCard>
          </div>
        </section>

        {/* VendorAvatar */}
        <section>
          <SectionTitle
            eyebrow="Components"
            title="VendorAvatar"
            description="Renders vendor initials in a deterministic color derived from the name hash. Five palettes ensure variety without randomness — the same name always maps to the same color."
          />
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DocCard
                title="Color palette"
                description="Five palettes distributed by name hash. Repeatable and stable across sessions."
              >
                <div className="space-y-3">
                  {['Stripe, Inc.', 'Amazon Web Services', 'Figma', 'Vercel', 'Notion'].map(
                    (name) => (
                      <div key={name} className="flex items-center gap-2.5">
                        <VendorAvatar name={name} />
                        <span className="text-sm text-ink-muted">{name}</span>
                      </div>
                    )
                  )}
                </div>
              </DocCard>

              <DocCard
                title="Sizes"
                description="Pass a numeric size prop in pixels. Font size scales automatically."
              >
                <div className="flex items-end gap-5">
                  {[28, 36, 44, 56].map((size) => (
                    <div key={size} className="flex flex-col items-center gap-2">
                      <VendorAvatar name="Stripe, Inc." size={size} />
                      <p className="font-mono text-[11px] text-ink-subtle">{size}</p>
                    </div>
                  ))}
                </div>
              </DocCard>
            </div>

            <DocCard
              title="In context — list row"
              description="Avatar + vendor name is the standard lead for bill list rows."
            >
              <div className="overflow-hidden rounded-lg border border-line divide-y divide-line">
                {[
                  { name: 'Stripe, Inc.',        invoice: 'INV-0834', amount: '$11,500.00', status: 'pending'   as BadgeVariant, label: 'Pending Approval' },
                  { name: 'Amazon Web Services', invoice: 'INV-0833', amount: '$8,240.00',  status: 'approved'  as BadgeVariant, label: 'Approved'         },
                  { name: 'Figma',              invoice: 'INV-0832', amount: '$6,000.00',  status: 'overdue'   as BadgeVariant, label: 'Overdue'          },
                ].map((row) => (
                  <div key={row.invoice} className="flex items-center gap-3 bg-surface px-4 py-3">
                    <VendorAvatar name={row.name} />
                    <span className="flex-1 text-sm font-medium text-ink">{row.name}</span>
                    <span className="font-mono text-sm text-ink-muted">{row.invoice}</span>
                    <Badge variant={row.status}>{row.label}</Badge>
                    <span className="w-24 text-right font-mono tabular-nums text-sm text-ink">
                      {row.amount}
                    </span>
                  </div>
                ))}
              </div>
            </DocCard>
          </div>
        </section>

        {/* SearchInput */}
        <section>
          <SectionTitle
            eyebrow="Components"
            title="SearchInput"
            description="A controlled input with a built-in search icon and a clear button that appears when the field has a value. Used to filter table data in list views — not for form submissions."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DocCard
              title="Default"
              description="Full-width within its container."
            >
              <SearchDemo
                placeholder="Search vendor or invoice…"
                className="w-full"
              />
            </DocCard>

            <DocCard
              title="In context — toolbar"
              description="Constrained width alongside page actions."
            >
              <div className="flex items-center justify-between rounded-lg border border-line bg-canvas px-4 py-3">
                <p className="text-sm font-semibold text-ink">Bills</p>
                <SearchDemo placeholder="Search…" className="w-44" />
              </div>
            </DocCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FORMS
        ══════════════════════════════════════════════════════════════════════ */}

        <section>
          <SectionTitle
            eyebrow="Forms"
            title="Inputs"
            description="Label, Input, Select, and Textarea share consistent sizing, focus rings, and error states. All four are composable inside FormField for accessible labeling. Use them raw only when building custom compositions."
          />
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <DocCard
                title="Input"
                description="Single-line text entry."
              >
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Default</p>
                    <Input placeholder="e.g. Stripe, Inc." />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Filled</p>
                    <Input defaultValue="Figma" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Error</p>
                    <Input error defaultValue="not-a-number" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Disabled</p>
                    <Input disabled defaultValue="Figma" />
                  </div>
                </div>
              </DocCard>

              <DocCard
                title="Select"
                description="Native select styled to match Input."
              >
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Default</p>
                    <Select>
                      <option value="" disabled>Select a category…</option>
                      <option>Software</option>
                      <option>Infrastructure</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Filled</p>
                    <Select defaultValue="software">
                      <option value="software">Software</option>
                      <option value="infrastructure">Infrastructure</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Error</p>
                    <Select error>
                      <option value="" disabled>Select a category…</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Disabled</p>
                    <Select disabled defaultValue="software">
                      <option value="software">Software</option>
                    </Select>
                  </div>
                </div>
              </DocCard>

              <DocCard
                title="Textarea"
                description="Multi-line text. Inherits all Input states."
              >
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Default</p>
                    <Textarea placeholder="Add notes for the reviewer…" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Filled</p>
                    <Textarea defaultValue={'Annual Figma license.\nCovers Q1–Q4 2026.'} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Error</p>
                    <Textarea error placeholder="Required field" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">Disabled</p>
                    <Textarea disabled defaultValue="Annual Figma license." />
                  </div>
                </div>
              </DocCard>
            </div>

            <DocCard
              title="Label"
              description="Always renders as a <label> element. The required asterisk is a visual affordance only — pair with validation logic."
            >
              <div className="flex flex-wrap items-center gap-6">
                <Label>Default label</Label>
                <Label required>Required label</Label>
                <Label className="cursor-not-allowed opacity-50">Disabled appearance</Label>
              </div>
            </DocCard>
          </div>
        </section>

        <section>
          <SectionTitle
            eyebrow="Forms"
            title="FormField"
            description="Composes Label + description + error message around any form control. Always use FormField instead of raw Label + Input pairs — it wires the htmlFor relationship and announces errors to screen readers."
          />
          <div className="space-y-4">
            <DocCard
              title="Composition patterns"
              description="FormField accepts any form control as its child via the children prop."
            >
              <div className="grid max-w-lg grid-cols-2 gap-x-6 gap-y-5">
                <FormField label="Vendor" htmlFor="ds-vendor">
                  <Input id="ds-vendor" placeholder="e.g. Stripe, Inc." />
                </FormField>
                <FormField
                  label="Invoice number"
                  htmlFor="ds-invoice"
                  required
                  description="Printed at the top of the invoice."
                >
                  <Input id="ds-invoice" placeholder="INV-2026-001" />
                </FormField>
                <FormField
                  label="Amount"
                  htmlFor="ds-amount"
                  error="Please enter a valid amount."
                >
                  <Input id="ds-amount" error defaultValue="not-a-number" />
                </FormField>
                <FormField
                  label="Category"
                  htmlFor="ds-category"
                  description="Used for reporting."
                >
                  <Select id="ds-category" defaultValue="software">
                    <option value="software">Software</option>
                    <option value="infrastructure">Infrastructure</option>
                  </Select>
                </FormField>
                <FormField
                  label="Notes"
                  htmlFor="ds-notes"
                  className="col-span-2"
                  description="Optional context for the reviewer."
                >
                  <Textarea id="ds-notes" placeholder="Add any additional context…" />
                </FormField>
              </div>
            </DocCard>

            <DocCard
              title="In context — bill create form"
              description="The Invoice details section from the Create Bill screen."
              padded={false}
            >
              <div className="p-5">
                <Card className="max-w-2xl p-5">
                  <h3 className="mb-5 text-sm font-semibold text-ink">Invoice details</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <FormField label="Vendor name" htmlFor="ctx-vendor" required>
                      <Input id="ctx-vendor" placeholder="e.g. Stripe, Inc." />
                    </FormField>
                    <FormField
                      label="Invoice number"
                      htmlFor="ctx-invoice"
                      required
                      description="As it appears on the document."
                    >
                      <Input id="ctx-invoice" placeholder="INV-2026-001" />
                    </FormField>
                    <FormField label="Invoice date" htmlFor="ctx-date" required>
                      <Input id="ctx-date" type="date" />
                    </FormField>
                    <FormField label="Due date" htmlFor="ctx-due" required>
                      <Input id="ctx-due" type="date" />
                    </FormField>
                    <FormField
                      label="Amount"
                      htmlFor="ctx-amount"
                      required
                      error="Please enter a valid amount."
                    >
                      <Input id="ctx-amount" error placeholder="0.00" />
                    </FormField>
                    <FormField
                      label="Category"
                      htmlFor="ctx-cat"
                      description="For budget allocation."
                    >
                      <Select id="ctx-cat">
                        <option value="" disabled>Select…</option>
                        <option>Software</option>
                        <option>Infrastructure</option>
                        <option>Professional Services</option>
                      </Select>
                    </FormField>
                    <FormField
                      label="Notes"
                      htmlFor="ctx-notes"
                      className="col-span-2"
                      description="Optional. Visible to approvers during review."
                    >
                      <Textarea
                        id="ctx-notes"
                        placeholder="Add context that will help the approver…"
                      />
                    </FormField>
                  </div>
                  <div className="mt-4 flex justify-end gap-2 border-t border-line pt-4">
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Submit for Approval</Button>
                  </div>
                </Card>
              </div>
            </DocCard>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            FEEDBACK
        ══════════════════════════════════════════════════════════════════════ */}

        <section>
          <SectionTitle
            eyebrow="Feedback"
            title="Toast"
            description="Non-blocking notifications that auto-dismiss after 4.5 seconds. Rendered in the top-right corner via ToastProvider in the root layout, which keeps them alive across client-side navigations. Call useToast() from any client component to trigger one."
          />
          <div className="space-y-4">
            <DocCard
              title="Variants — click to trigger"
              description="Four variants, each mapping to a semantic status color. Toasts stack and animate with Framer Motion."
            >
              <ToastDemo />
            </DocCard>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <DocCard title="API">
                <pre className="text-xs leading-relaxed text-ink-muted">{`import { useToast } from '@/components/ui/toaster'

const { toast } = useToast()

toast({
  variant: 'success',   // success | info | warning | error
  title: 'Bill created',
  description: 'Saved as a draft.',  // optional
})`}</pre>
              </DocCard>

              <DocCard title="When to use each variant">
                <div className="space-y-3">
                  {[
                    { v: 'success', use: 'Completed actions — bill created, approved, updated.' },
                    { v: 'info',    use: 'Neutral status updates — sync started, data loading.' },
                    { v: 'warning', use: 'Non-blocking caution — payment may be delayed.' },
                    { v: 'error',   use: 'Failures — constraint violations, save errors.' },
                  ].map(({ v, use }) => (
                    <div key={v} className="flex items-start gap-3">
                      <span className="w-14 shrink-0 font-mono text-xs font-medium text-ink">
                        {v}
                      </span>
                      <span className="text-xs text-ink-muted">{use}</span>
                    </div>
                  ))}
                </div>
              </DocCard>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            PATTERNS
        ══════════════════════════════════════════════════════════════════════ */}

        <section>
          <SectionTitle
            eyebrow="Patterns"
            title="Bill List"
            description="The primary data table. Vendor (with avatar), invoice number, amount, due date, and status are the five standard columns. Table rows hover to bg-surface-subtle."
          />
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="text-sm font-semibold text-ink">Recent Bills</p>
              <Button variant="ghost" size="sm">View all</Button>
            </div>
            <table className="w-full">
              <thead className="border-b border-line bg-surface-subtle">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Invoice</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-ink-muted">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Due</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {bills.map((bill) => (
                  <tr
                    key={bill.id}
                    className="transition-colors duration-75 hover:bg-surface-subtle"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <VendorAvatar name={bill.vendor} size={28} />
                        <span className="text-sm font-medium text-ink">{bill.vendor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-sm text-ink-muted">
                      {bill.invoice}
                    </td>
                    <td className="px-6 py-3.5 text-right font-mono tabular-nums text-sm text-ink">
                      {usd(bill.amount)}
                    </td>
                    <td className="px-6 py-3.5 text-sm text-ink-muted">{bill.due}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant={bill.status}>{bill.label}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

      </div>
    </div>
  )
}
