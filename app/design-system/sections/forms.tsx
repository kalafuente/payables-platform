import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { SectionTitle, DocCard, Row } from '../doc-components'

export function FormsSection() {
  return (
    <>
      <section>
        <SectionTitle
          eyebrow="Forms"
          title="Inputs"
          description="Input, Select, and Textarea share consistent height, focus rings, and error states. Compose with FormField for accessible labeling."
        />
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <DocCard title="Input" description="Single-line text entry.">
              <div className="space-y-2.5">
                {[
                  { label: 'Default',  el: <Input placeholder="e.g. Stripe, Inc." /> },
                  { label: 'Filled',   el: <Input defaultValue="Figma" /> },
                  { label: 'Error',    el: <Input error defaultValue="not-a-number" /> },
                  { label: 'Disabled', el: <Input disabled defaultValue="Figma" /> },
                ].map(({ label, el }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-[11px] text-ink-subtle">{label}</p>
                    {el}
                  </div>
                ))}
              </div>
            </DocCard>

            <DocCard title="Select" description="Native select styled to match Input.">
              <div className="space-y-2.5">
                <div className="space-y-1">
                  <p className="text-[11px] text-ink-subtle">Default</p>
                  <Select><option value="" disabled>Select a category…</option><option>Software</option><option>Infrastructure</option></Select>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-ink-subtle">Filled</p>
                  <Select defaultValue="software"><option value="software">Software</option><option value="infrastructure">Infrastructure</option></Select>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-ink-subtle">Error</p>
                  <Select error><option value="" disabled>Select a category…</option></Select>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] text-ink-subtle">Disabled</p>
                  <Select disabled defaultValue="software"><option value="software">Software</option></Select>
                </div>
              </div>
            </DocCard>

            <DocCard title="Textarea" description="Multi-line text. Inherits all Input states.">
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
            description="Always renders as a <label>. The required asterisk is visual only — pair with validation logic."
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
          description="Composes Label + description + error around any control. Prefer FormField over raw Label + Input — it wires htmlFor and announces errors to screen readers."
        />
        <div className="space-y-5">
          <DocCard
            title="Composition patterns"
            description="Accepts any form control as its child."
          >
            <div className="grid max-w-lg grid-cols-2 gap-x-6 gap-y-5">
              <FormField label="Vendor" htmlFor="ds-vendor">
                <Input id="ds-vendor" placeholder="e.g. Stripe, Inc." />
              </FormField>
              <FormField label="Invoice number" htmlFor="ds-invoice" required description="Printed at the top of the invoice.">
                <Input id="ds-invoice" placeholder="INV-2026-001" />
              </FormField>
              <FormField label="Amount" htmlFor="ds-amount" error="Please enter a valid amount.">
                <Input id="ds-amount" error defaultValue="not-a-number" />
              </FormField>
              <FormField label="Category" htmlFor="ds-category" description="Used for reporting.">
                <Select id="ds-category" defaultValue="software">
                  <option value="software">Software</option>
                  <option value="infrastructure">Infrastructure</option>
                </Select>
              </FormField>
              <FormField label="Notes" htmlFor="ds-notes" className="col-span-2" description="Optional context for the reviewer.">
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
                  <FormField label="Invoice number" htmlFor="ctx-invoice" required description="As it appears on the document.">
                    <Input id="ctx-invoice" placeholder="INV-2026-001" />
                  </FormField>
                  <FormField label="Invoice date" htmlFor="ctx-date" required>
                    <Input id="ctx-date" type="date" />
                  </FormField>
                  <FormField label="Due date" htmlFor="ctx-due" required>
                    <Input id="ctx-due" type="date" />
                  </FormField>
                  <FormField label="Amount" htmlFor="ctx-amount" required error="Please enter a valid amount.">
                    <Input id="ctx-amount" error placeholder="0.00" />
                  </FormField>
                  <FormField label="Category" htmlFor="ctx-cat" description="For budget allocation.">
                    <Select id="ctx-cat">
                      <option value="" disabled>Select…</option>
                      <option>Software</option>
                      <option>Infrastructure</option>
                      <option>Professional Services</option>
                    </Select>
                  </FormField>
                  <FormField label="Notes" htmlFor="ctx-notes" className="col-span-2" description="Optional. Visible to approvers during review.">
                    <Textarea id="ctx-notes" placeholder="Add context that will help the approver…" />
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
    </>
  )
}
