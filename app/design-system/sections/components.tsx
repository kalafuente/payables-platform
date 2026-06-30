'use client'

import { Button } from '@/components/ui/button'
import { Badge, type BadgeVariant } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import { formatCurrency } from '@/lib/format'
import { SectionTitle, DocCard, Row } from '../doc-components'
import { LoadingDemo, SearchDemo } from '../demos'
import { bills, lineItems } from '../data'

export function ComponentsSection() {
  return (
    <>
      <section>
        <SectionTitle
          eyebrow="Components"
          title="Button"
          description="Five variants mapped to intent hierarchy. Accent is the highest-emphasis action — at most one per view. Ghost and secondary support secondary actions without competing for attention."
        />
        <div className="space-y-5">
          <DocCard
            title="Variants"
            description="Choose based on the action's importance relative to others on the same surface."
          >
            <Row label="All variants — medium size">
              <Button variant="accent">Accent</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </Row>
          </DocCard>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              description="Loading disables the button and shows a spinner. Click to trigger a 2 s demo."
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
            description="Accent for the page CTA. Never two accent buttons on the same surface."
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

      <section>
        <SectionTitle
          eyebrow="Components"
          title="Badge"
          description="Read-only status indicators for the bill lifecycle. Each variant maps to a semantic foreground/background color pair. Badges never trigger actions."
        />
        <div className="space-y-5">
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
            description="Badges sit next to vendor names in list rows."
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

      <section>
        <SectionTitle
          eyebrow="Components"
          title="Card"
          description="Groups related content on bg-surface with a subtle border and shadow. Divide internal sections with border-line, not padding alone."
        />
        <div className="space-y-5">
          <DocCard
            title="Metric cards"
            description="Dashboard KPIs. Large tabular number for the primary value; badge or subtext for context."
          >
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-5">
                <p className="text-xs font-medium text-ink-muted">To Approve</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">7</p>
                <div className="mt-2"><Badge variant="overdue">3 overdue</Badge></div>
              </Card>
              <Card className="p-5">
                <p className="text-xs font-medium text-ink-muted">Due This Week</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-ink">$48,250</p>
                <p className="mt-2 text-xs text-ink-subtle">5 bills</p>
              </Card>
              <Card className="p-5">
                <p className="text-xs font-medium text-ink-muted">Paid This Month</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-ink">$128,450</p>
                <p className="mt-2 text-xs text-ink-subtle">14 bills</p>
              </Card>
            </div>
          </DocCard>

          <DocCard
            title="Bill detail card"
            description="Header, line-item table, total footer, and action row sectioned inside a single Card with overflow-hidden."
            padded={false}
          >
            <div className="p-5">
              <Card className="max-w-xl overflow-hidden">
                <div className="flex items-start justify-between border-b border-line px-6 py-5">
                  <div>
                    <p className="text-sm font-semibold text-ink">Stripe, Inc.</p>
                    <p className="mt-0.5 text-xs text-ink-muted">INV-2025-0834 · Due Jan 15, 2026</p>
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
                          <td className="py-3 text-right font-mono tabular-nums text-sm text-ink">{formatCurrency(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-between border-t border-line bg-surface-subtle px-6 py-4">
                  <p className="text-sm font-medium text-ink-muted">Total</p>
                  <p className="font-mono tabular-nums text-base font-semibold text-ink">
                    {formatCurrency(lineItems.reduce((s, i) => s + i.amount, 0))}
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

      <section>
        <SectionTitle
          eyebrow="Components"
          title="VendorAvatar"
          description="Initials avatar with a color derived from the vendor name hash. Five palettes — deterministic and stable across sessions."
        />
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DocCard
              title="Color palette"
              description="Five palettes distributed by name hash. Same name always maps to the same color."
            >
              <div className="space-y-3">
                {['Stripe, Inc.', 'Amazon Web Services', 'Figma', 'Vercel', 'Notion'].map((name) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <VendorAvatar name={name} />
                    <span className="text-sm text-ink-muted">{name}</span>
                  </div>
                ))}
              </div>
            </DocCard>

            <DocCard
              title="Sizes"
              description="Numeric size prop in pixels. Font size scales automatically."
            >
              <div className="flex items-end gap-6">
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
                { name: 'Stripe, Inc.',        invoice: 'INV-0834', amount: '$11,500', status: 'pending'   as BadgeVariant, label: 'Pending Approval' },
                { name: 'Amazon Web Services', invoice: 'INV-0833', amount: '$8,240',  status: 'approved'  as BadgeVariant, label: 'Approved'         },
                { name: 'Figma',              invoice: 'INV-0832', amount: '$6,000',  status: 'overdue'   as BadgeVariant, label: 'Overdue'          },
              ].map((row) => (
                <div key={row.invoice} className="flex items-center gap-3 bg-surface px-4 py-3">
                  <VendorAvatar name={row.name} />
                  <span className="flex-1 text-sm font-medium text-ink">{row.name}</span>
                  <span className="font-mono text-sm text-ink-muted">{row.invoice}</span>
                  <Badge variant={row.status}>{row.label}</Badge>
                  <span className="w-24 text-right font-mono tabular-nums text-sm text-ink">{row.amount}</span>
                </div>
              ))}
            </div>
          </DocCard>
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Components"
          title="SearchInput"
          description="Controlled input with built-in search icon and clear button. For table filtering — not form submissions."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <DocCard title="Default" description="Full-width within its container.">
            <SearchDemo placeholder="Search vendor or invoice…" className="w-full" />
          </DocCard>

          <DocCard title="In context — toolbar" description="Constrained width alongside page actions.">
            <div className="flex items-center justify-between rounded-lg border border-line bg-canvas px-4 py-3">
              <p className="text-sm font-semibold text-ink">Bills</p>
              <SearchDemo placeholder="Search…" className="w-44" />
            </div>
          </DocCard>
        </div>
      </section>
    </>
  )
}
