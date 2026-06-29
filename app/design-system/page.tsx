'use client'

/**
 * Development-only page for visual validation of design system components.
 * Not linked from the application. Delete before launch.
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

// ── Local layout helpers ───────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-b border-line pb-2.5 mb-8">
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-ink-subtle">
        {title}
      </h2>
    </div>
  )
}

function Group({
  label,
  align = 'center',
  children,
}: {
  label: string
  align?: 'center' | 'start'
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs text-ink-subtle">{label}</p>
      <div
        className={`flex flex-wrap gap-3 ${align === 'start' ? 'items-start' : 'items-center'}`}
      >
        {children}
      </div>
    </div>
  )
}

// ── Search demos ──────────────────────────────────────────────────────────────

function SearchDemo() {
  const [value, setValue] = useState('')
  return <SearchInput value={value} onChange={setValue} placeholder="Search vendor or invoice…" className="w-64" />
}

function SearchNarrowDemo() {
  const [value, setValue] = useState('')
  return <SearchInput value={value} onChange={setValue} placeholder="Search…" className="w-40" />
}

// ── Loading state demos ────────────────────────────────────────────────────────

function LoadingAccentDemo() {
  const [loading, setLoading] = useState(false)
  function trigger() { setLoading(true); setTimeout(() => setLoading(false), 2000) }
  return (
    <Button variant="accent" loading={loading} onClick={trigger}>
      {loading ? 'Creating…' : 'New Bill'}
    </Button>
  )
}

function LoadingButtonDemo() {
  const [loading, setLoading] = useState(false)
  function trigger() { setLoading(true); setTimeout(() => setLoading(false), 2000) }
  return (
    <Button loading={loading} onClick={trigger}>
      {loading ? 'Approving…' : 'Approve Bill'}
    </Button>
  )
}

function LoadingDangerDemo() {
  const [loading, setLoading] = useState(false)
  function trigger() { setLoading(true); setTimeout(() => setLoading(false), 2000) }
  return (
    <Button variant="danger" loading={loading} onClick={trigger}>
      {loading ? 'Rejecting…' : 'Reject Bill'}
    </Button>
  )
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const lineItems = [
  { description: 'Software infrastructure', qty: 1, amount: 9_800 },
  { description: 'API usage fees', qty: 1, amount: 1_200 },
  { description: 'Support & maintenance', qty: 1, amount: 500 },
]

const recentBills: {
  id: string
  vendor: string
  invoice: string
  amount: number
  due: string
  status: BadgeVariant
  label: string
}[] = [
    { id: '1', vendor: 'Stripe, Inc.', invoice: 'INV-0834', amount: 11_500, due: 'Jan 15, 2026', status: 'pending', label: 'Pending Approval' },
    { id: '2', vendor: 'Amazon Web Services', invoice: 'INV-0833', amount: 8_240, due: 'Jan 20, 2026', status: 'approved', label: 'Approved' },
    { id: '3', vendor: 'Figma', invoice: 'INV-0832', amount: 6_000, due: 'Dec 31, 2025', status: 'overdue', label: 'Overdue' },
    { id: '4', vendor: 'Vercel', invoice: 'INV-0831', amount: 2_400, due: 'Jan 30, 2026', status: 'scheduled', label: 'Scheduled' },
    { id: '5', vendor: 'Notion', invoice: 'INV-0830', amount: 1_200, due: 'Jan 10, 2026', status: 'paid', label: 'Paid' },
  ]

function usd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">

        {/* Page header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            Design System
          </p>
          <h1 className="text-2xl font-semibold text-ink">Design System</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Internal component library used to build the Accounts Payable product.
          </p>
        </div>

        {/* ── Buttons ─────────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader title="Button" />

          <Group label="Variants — medium size">
            <Button variant="accent">Accent</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </Group>

          <Group label="Sizes — primary variant">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Group>

          <Group label="Sizes — secondary variant">
            <Button variant="secondary" size="sm">Small</Button>
            <Button variant="secondary" size="md">Medium</Button>
            <Button variant="secondary" size="lg">Large</Button>
          </Group>

          <Group label="Loading state — click to trigger (resets after 2 s)">
            <LoadingAccentDemo />
            <LoadingButtonDemo />
            <LoadingDangerDemo />
          </Group>

          <Group label="Disabled state">
            <Button variant="accent" disabled>Accent</Button>
            <Button disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="danger" disabled>Danger</Button>
          </Group>

          <Group label="Accent in context — high-emphasis CTA only" align="start">
            <div className="flex items-center justify-between w-full max-w-lg bg-surface border border-line rounded-sm px-5 py-3.5">
              <p className="text-sm font-semibold text-ink">Bills</p>
              <Button variant="accent">New Bill</Button>
            </div>
          </Group>
        </section>

        {/* ── Badges ──────────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader title="Badge" />

          <Group label="All status variants">
            <Badge variant="draft">Draft</Badge>
            <Badge variant="pending">Pending Approval</Badge>
            <Badge variant="approved">Approved</Badge>
            <Badge variant="scheduled">Scheduled</Badge>
            <Badge variant="paid">Paid</Badge>
            <Badge variant="overdue">Overdue</Badge>
            <Badge variant="default">Default</Badge>
          </Group>

          <Group label="Inline with body text — as rendered in tables" align="start">
            {recentBills.map((bill) => (
              <span
                key={bill.id}
                className="inline-flex items-center gap-2 text-sm text-ink-muted"
              >
                {bill.vendor}
                <Badge variant={bill.status}>{bill.label}</Badge>
              </span>
            ))}
          </Group>
        </section>

        {/* ── Cards ───────────────────────────────────────────────────────────── */}
        <section className="space-y-10">
          <SectionHeader title="Card" />

          {/* Stat cards */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Metric cards — dashboard KPIs</p>
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-5">
                <p className="text-xs font-medium text-ink-muted">To Approve</p>
                <p className="mt-2 text-3xl font-semibold text-ink tracking-tight">7</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <Badge variant="overdue">3 overdue</Badge>
                </div>
              </Card>

              <Card className="p-5">
                <p className="text-xs font-medium text-ink-muted">Due This Week</p>
                <p className="mt-2 text-3xl font-semibold text-ink tracking-tight tabular-nums">
                  $48,250
                </p>
                <p className="mt-2 text-xs text-ink-subtle">5 bills</p>
              </Card>

              <Card className="p-5">
                <p className="text-xs font-medium text-ink-muted">Paid This Month</p>
                <p className="mt-2 text-3xl font-semibold text-ink tracking-tight tabular-nums">
                  $128,450
                </p>
                <p className="mt-2 text-xs text-ink-subtle">14 bills</p>
              </Card>
            </div>
          </div>

          {/* Bill detail card */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Bill detail card</p>
            <Card className="max-w-xl overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-5 border-b border-line flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">Stripe, Inc.</p>
                  <p className="text-xs text-ink-muted mt-0.5">
                    INV-2025-0834 · Due Jan 15, 2026
                  </p>
                </div>
                <Badge variant="pending">Pending Approval</Badge>
              </div>

              {/* Line items */}
              <div className="px-6 py-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-line">
                      <th className="pb-2.5 text-left text-xs font-medium text-ink-muted">
                        Description
                      </th>
                      <th className="pb-2.5 text-center text-xs font-medium text-ink-muted w-12">
                        Qty
                      </th>
                      <th className="pb-2.5 text-right text-xs font-medium text-ink-muted">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {lineItems.map((item) => (
                      <tr key={item.description}>
                        <td className="py-3 text-sm text-ink">{item.description}</td>
                        <td className="py-3 text-sm text-ink-muted text-center">{item.qty}</td>
                        <td className="py-3 text-sm text-ink text-right font-mono tabular-nums">
                          {usd(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-line flex items-center justify-between">
                <p className="text-sm font-medium text-ink-muted">Total</p>
                <p className="text-base font-semibold text-ink font-mono tabular-nums">
                  {usd(lineItems.reduce((sum, i) => sum + i.amount, 0))}
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-line flex items-center justify-end gap-2">
                <Button variant="secondary" size="sm">Request changes</Button>
                <Button variant="danger" size="sm">Reject</Button>
                <Button size="sm">Approve</Button>
              </div>
            </Card>
          </div>

          {/* Table card */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Table card — bill list</p>
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-line flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">Recent Bills</p>
                <Button variant="ghost" size="sm">View all</Button>
              </div>

              <table className="w-full">
                <thead className="bg-slate-50 border-b border-line">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-ink-muted">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">
                      Due
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-ink-muted">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {recentBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="hover:bg-slate-50 transition-colors duration-75"
                    >
                      <td className="px-6 py-3.5 text-sm font-medium text-ink">
                        {bill.vendor}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-ink-muted font-mono">
                        {bill.invoice}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-ink text-right font-mono tabular-nums">
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
          </div>
        </section>

        {/* ── Form Components ─────────────────────────────────────────────────── */}
        <section className="space-y-10">
          <SectionHeader title="Form Components" />

          {/* Label */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Label</p>
            <div className="flex flex-wrap items-center gap-6">
              <Label>Default label</Label>
              <Label required>Required label</Label>
              <Label className="opacity-50 cursor-not-allowed">Disabled appearance</Label>
            </div>
          </div>

          {/* Input */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Input — states</p>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
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
          </div>

          {/* Select */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Select — states</p>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              <div className="space-y-1">
                <p className="text-[11px] text-ink-subtle">Default (empty)</p>
                <Select>
                  <option value="" disabled>Select a category…</option>
                  <option>Software</option>
                  <option>Infrastructure</option>
                  <option>Services</option>
                </Select>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-ink-subtle">With value</p>
                <Select defaultValue="software">
                  <option value="software">Software</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="services">Services</option>
                </Select>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-ink-subtle">Error</p>
                <Select error>
                  <option value="" disabled>Select a category…</option>
                  <option>Software</option>
                </Select>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-ink-subtle">Disabled</p>
                <Select disabled defaultValue="software">
                  <option value="software">Software</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">Textarea — states</p>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
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
                <Textarea error placeholder="Add notes for the reviewer…" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-ink-subtle">Disabled</p>
                <Textarea disabled defaultValue="Annual Figma license." />
              </div>
            </div>
          </div>

          {/* FormField */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">FormField — composition patterns</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-w-lg">
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
                description="Used for reporting and budgets."
              >
                <Select id="ds-category" defaultValue="software">
                  <option value="software">Software</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="services">Services</option>
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
          </div>

          {/* FormField in a realistic card context */}
          <div className="space-y-2.5">
            <p className="text-xs text-ink-subtle">FormField in context — bill create form section</p>
            <Card className="max-w-2xl p-6">
              <h3 className="text-sm font-semibold text-ink mb-5">Invoice details</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
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
                    <option>Marketing</option>
                    <option>Other</option>
                  </Select>
                </FormField>

                <FormField
                  label="Notes"
                  htmlFor="ctx-notes"
                  className="col-span-2"
                  description="Optional. Visible to approvers during review."
                >
                  <Textarea id="ctx-notes" placeholder="Add context that will help the approver…" />
                </FormField>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-line pt-5">
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Submit for Approval</Button>
              </div>
            </Card>
          </div>

        </section>

        {/* ── VendorAvatar ────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader title="VendorAvatar" />

          <Group label="Palette — deterministic by name">
            {['Stripe, Inc.', 'Amazon Web Services', 'Figma', 'Vercel', 'Notion'].map(name => (
              <div key={name} className="flex items-center gap-2.5">
                <VendorAvatar name={name} />
                <span className="text-sm text-ink-muted">{name}</span>
              </div>
            ))}
          </Group>

          <Group label="Sizes">
            <VendorAvatar name="Stripe, Inc." size={28} />
            <VendorAvatar name="Stripe, Inc." size={36} />
            <VendorAvatar name="Stripe, Inc." size={44} />
          </Group>

          <Group label="In context — table row" align="start">
            <div className="w-full max-w-2xl divide-y divide-line border border-line rounded-lg overflow-hidden">
              {[
                { name: 'Stripe, Inc.', invoice: 'INV-0834', amount: '$11,500.00' },
                { name: 'Amazon Web Services', invoice: 'INV-0833', amount: '$8,240.00' },
                { name: 'Figma', invoice: 'INV-0832', amount: '$6,000.00' },
              ].map(row => (
                <div key={row.invoice} className="flex items-center gap-3 px-4 py-3 bg-surface">
                  <VendorAvatar name={row.name} />
                  <span className="flex-1 text-sm font-medium text-ink">{row.name}</span>
                  <span className="text-sm font-mono text-ink-muted">{row.invoice}</span>
                  <span className="w-24 text-right text-sm font-mono tabular-nums text-ink">{row.amount}</span>
                </div>
              ))}
            </div>
          </Group>
        </section>

        {/* ── SearchInput ─────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <SectionHeader title="SearchInput" />

          <Group label="Default (w-64)">
            <SearchDemo />
          </Group>

          <Group label="Narrow (w-40)">
            <SearchNarrowDemo />
          </Group>

          <Group label="In context — bills list toolbar" align="start">
            <div className="flex items-center justify-between w-full max-w-2xl bg-surface border border-line rounded-lg px-5 py-3.5">
              <p className="text-sm font-semibold text-ink">Bills</p>
              <SearchInput value="" onChange={() => {}} placeholder="Search vendor or invoice…" className="w-64" />
            </div>
          </Group>
        </section>

      </div>
    </div>
  )
}
