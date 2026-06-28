'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { InvoiceUpload, type OCRResult } from './invoice-upload'
import { LineItemsEditor, nextLineItemId, type LineItemDraft } from './line-items-editor'
import {
  addBill,
  generateBillId,
  type Bill,
  type LineItem,
  type ActivityEntry,
} from '@/lib/mock-bills'

interface FormState {
  vendor: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  memo: string
}

const EMPTY_FORM: FormState = {
  vendor: '',
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  memo: '',
}

function ChevronLeft() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="M10 3L5 8l5 5" />
    </svg>
  )
}

function initialLineItem(): LineItemDraft {
  return { id: nextLineItemId(), description: '', quantity: '1', unitPrice: '' }
}

export function BillCreateClient() {
  const router = useRouter()
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [lineItems, setLineItems] = useState<LineItemDraft[]>([initialLineItem()])
  const [errors, setErrors] = useState<Record<string, string>>({})

  function setField(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const next = { ...e }; delete next[field]; return next })
  }

  function handleExtracted(data: OCRResult) {
    setForm(f => ({
      ...f,
      vendor: data.vendor,
      invoiceNumber: data.invoiceNumber,
      invoiceDate: data.invoiceDate,
      dueDate: data.dueDate,
    }))
    setLineItems(data.lineItems.map(item => ({
      id: nextLineItemId(),
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    })))
    setErrors({})
  }

  function computeTotal(): number {
    return lineItems.reduce((sum, item) => {
      return sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0)
    }, 0)
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {}
    if (!form.vendor.trim()) errs.vendor = 'Vendor name is required.'
    if (!form.invoiceNumber.trim()) errs.invoiceNumber = 'Invoice number is required.'
    if (!form.invoiceDate) errs.invoiceDate = 'Invoice date is required.'
    if (!form.dueDate) errs.dueDate = 'Due date is required.'
    return errs
  }

  function buildBillPayload(id: string): { bill: Bill; lineItems: LineItem[]; activity: ActivityEntry[] } {
    const today = new Date().toISOString().slice(0, 10)
    const bill: Bill = {
      id,
      vendorName: form.vendor.trim() || 'Unnamed vendor',
      invoiceNumber: form.invoiceNumber.trim() || `DRAFT-${id}`,
      invoiceDate: form.invoiceDate || today,
      dueDate: form.dueDate || today,
      amount: computeTotal(),
      status: 'draft',
    }
    const convertedLineItems: LineItem[] = lineItems
      .filter(item => item.description.trim())
      .map((item, i) => ({
        id: `${id}-li${i}`,
        description: item.description.trim(),
        quantity: parseFloat(item.quantity) || 1,
        unitPrice: parseFloat(item.unitPrice) || 0,
        amount: (parseFloat(item.quantity) || 1) * (parseFloat(item.unitPrice) || 0),
      }))
    const activity: ActivityEntry[] = [{
      id: `${id}-a0`,
      type: 'created',
      label: 'Bill created',
      actor: 'Karen L.',
      date: today,
    }]
    return { bill, lineItems: convertedLineItems, activity }
  }

  function handleCreate() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const id = generateBillId()
    const { bill, lineItems: li, activity } = buildBillPayload(id)
    addBill(bill, li, activity)
    router.push('/bills')
  }

  function handleSaveDraft() {
    const id = generateBillId()
    const { bill, lineItems: li, activity } = buildBillPayload(id)
    addBill(bill, li, activity)
    router.push('/bills')
  }

  return (
    <div>
      <Link
        href="/bills"
        className="group mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100"
      >
        <span className="transition-transform duration-100 group-hover:-translate-x-0.5">
          <ChevronLeft />
        </span>
        Bills
      </Link>

      <h1 className="mb-6 text-xl font-semibold text-ink">Create Bill</h1>

      <div className="space-y-4">
        {/* Invoice upload */}
        <InvoiceUpload onExtracted={handleExtracted} />

        {/* Invoice details */}
        <Card className="p-6">
          <h2 className="mb-5 text-sm font-semibold text-ink">Invoice details</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Vendor"
              htmlFor="vendor"
              required
              error={errors.vendor}
            >
              <Input
                id="vendor"
                value={form.vendor}
                onChange={e => setField('vendor', e.target.value)}
                error={!!errors.vendor}
                placeholder="e.g. Stripe, Inc."
              />
            </FormField>

            <FormField
              label="Invoice number"
              htmlFor="invoice-number"
              required
              error={errors.invoiceNumber}
            >
              <Input
                id="invoice-number"
                value={form.invoiceNumber}
                onChange={e => setField('invoiceNumber', e.target.value)}
                error={!!errors.invoiceNumber}
                placeholder="INV-2026-001"
              />
            </FormField>

            <FormField
              label="Invoice date"
              htmlFor="invoice-date"
              required
              error={errors.invoiceDate}
            >
              <Input
                id="invoice-date"
                type="date"
                value={form.invoiceDate}
                onChange={e => setField('invoiceDate', e.target.value)}
                error={!!errors.invoiceDate}
              />
            </FormField>

            <FormField
              label="Due date"
              htmlFor="due-date"
              required
              error={errors.dueDate}
            >
              <Input
                id="due-date"
                type="date"
                value={form.dueDate}
                onChange={e => setField('dueDate', e.target.value)}
                error={!!errors.dueDate}
              />
            </FormField>
          </div>
        </Card>

        {/* Line items */}
        <LineItemsEditor items={lineItems} onChange={setLineItems} />

        {/* Memo */}
        <Card className="p-6">
          <FormField
            label="Memo"
            htmlFor="memo"
            description="Optional. Visible to approvers during review."
          >
            <Textarea
              id="memo"
              value={form.memo}
              onChange={e => setField('memo', e.target.value)}
              placeholder="Add context for the approver…"
            />
          </FormField>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 py-2">
          <Button variant="ghost" onClick={() => router.push('/bills')}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create Bill
          </Button>
        </div>
      </div>
    </div>
  )
}
