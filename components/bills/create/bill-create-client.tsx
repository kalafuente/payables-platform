'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/components/ui/form-field'
import { InvoiceUpload, type OCRResult } from './invoice-upload'
import { InvoicePreviewPanel } from './invoice-preview-panel'
import { LineItemsEditor, nextLineItemId, type LineItemDraft } from './line-items-editor'
import { createBill, updateBill } from '@/app/actions'
import { useToast } from '@/components/ui/toaster'
import { ChevronLeftIcon } from '@/components/icons'

interface FormState {
  vendor: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  memo: string
}

export interface BillInitialValues {
  vendor: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  memo: string
  lineItems: LineItemDraft[]
}

interface BillCreateClientProps {
  // When provided, the component operates in edit mode.
  billId?: string
  initialValues?: BillInitialValues
}

const EMPTY_FORM: FormState = {
  vendor: '',
  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  memo: '',
}


function initialLineItem(): LineItemDraft {
  return { id: nextLineItemId(), description: '', quantity: '1', unitPrice: '' }
}

export function BillCreateClient({ billId, initialValues }: BillCreateClientProps = {}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isEditMode = !!billId

  const [form, setForm] = useState<FormState>(
    initialValues
      ? {
        vendor: initialValues.vendor,
        invoiceNumber: initialValues.invoiceNumber,
        invoiceDate: initialValues.invoiceDate,
        dueDate: initialValues.dueDate,
        memo: initialValues.memo,
      }
      : EMPTY_FORM
  )

  const [lineItems, setLineItems] = useState<LineItemDraft[]>(
    initialValues?.lineItems.length
      ? initialValues.lineItems
      : [initialLineItem()]
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [hasPreview, setHasPreview] = useState(false)
  const { toast } = useToast()

  const cancelHref = isEditMode ? `/bills/${billId}` : '/bills'

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
    setHasPreview(true)
    toast({
      variant: 'success',
      title: 'Invoice uploaded',
      description: 'Invoice data was extracted and the form has been pre-filled.',
    })
  }

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {}
    if (!form.vendor.trim()) errs.vendor = 'Vendor name is required.'
    if (!form.invoiceNumber.trim()) errs.invoiceNumber = 'Invoice number is required.'
    if (!form.invoiceDate) errs.invoiceDate = 'Invoice date is required.'
    if (!form.dueDate) errs.dueDate = 'Due date is required.'
    return errs
  }

  function buildInput(applyDefaults: boolean) {
    const today = new Date().toISOString().slice(0, 10)
    return {
      vendorName: applyDefaults ? (form.vendor.trim() || 'Unnamed vendor') : form.vendor.trim(),
      invoiceNumber: applyDefaults ? (form.invoiceNumber.trim() || `DRAFT-${Date.now()}`) : form.invoiceNumber.trim(),
      invoiceDate: form.invoiceDate || (applyDefaults ? today : ''),
      dueDate: form.dueDate || (applyDefaults ? today : ''),
      memo: form.memo.trim(),
      lineItems: lineItems.map(li => ({
        description: li.description,
        quantity: parseFloat(li.quantity) || 0,
        unitPrice: parseFloat(li.unitPrice) || 0,
      })),
    }
  }

  function handleSave() {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    startTransition(async () => {
      if (isEditMode) {
        const result = await updateBill(billId!, buildInput(false))
        if (result?.error) {
          toast({ variant: 'error', title: 'Could not save changes', description: result.error })
          return
        }
        toast({ variant: 'success', title: 'Draft updated', description: 'Your changes have been saved.' })
        router.push(`/bills/${billId}`)
      } else {
        const result = await createBill(buildInput(false))
        if (result?.error) {
          toast({ variant: 'error', title: 'Could not create bill', description: result.error })
          return
        }
        toast({ variant: 'success', title: 'Bill created', description: 'The invoice has been saved as a draft.' })
        router.push('/bills')
      }
    })
  }

  function handleSaveDraft() {
    startTransition(async () => {
      const result = await createBill(buildInput(true))
      if (result?.error) {
        toast({ variant: 'error', title: 'Could not create bill', description: result.error })
        return
      }
      toast({ variant: 'success', title: 'Bill created', description: 'The invoice has been saved as a draft.' })
      router.push('/bills')
    })
  }

  // Form fields are shared between both layout branches.
  const formFields = (
    <>
      {/* Invoice details */}
      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">Invoice details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              disabled={isPending}
              aria-required="true"
              aria-describedby={errors.vendor ? 'vendor-error' : undefined}
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
              disabled={isPending}
              aria-required="true"
              aria-describedby={errors.invoiceNumber ? 'invoice-number-error' : undefined}
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
              disabled={isPending}
              aria-required="true"
              aria-describedby={errors.invoiceDate ? 'invoice-date-error' : undefined}
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
              disabled={isPending}
              aria-required="true"
              aria-describedby={errors.dueDate ? 'due-date-error' : undefined}
            />
          </FormField>
        </div>
      </Card>

      {/* Line items */}
      <LineItemsEditor items={lineItems} onChange={setLineItems} />

      {/* Memo */}
      <Card className="p-5">
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
            disabled={isPending}
          />
        </FormField>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 py-2">
        <Button variant="ghost" onClick={() => router.push(cancelHref)} disabled={isPending}>
          Cancel
        </Button>
        {!isEditMode && (
          <Button variant="secondary" onClick={handleSaveDraft} disabled={isPending}>
            {isPending ? 'Saving…' : 'Save Draft'}
          </Button>
        )}
        <Button variant="primary" onClick={handleSave} disabled={isPending}>
          {isPending
            ? (isEditMode ? 'Saving…' : 'Creating…')
            : (isEditMode ? 'Save Changes' : 'Create Bill')}
        </Button>
      </div>
    </>
  )

  return (
    <div>
      <Link
        href={cancelHref}
        className="group mb-3 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100"
      >
        <span className="transition-transform duration-100 group-hover:-translate-x-0.5">
          <ChevronLeftIcon className="size-3.5" />
        </span>
        {isEditMode ? 'Bill' : 'Bills'}
      </Link>

      <h1 className="mb-4 text-xl font-semibold text-ink">
        {isEditMode ? 'Edit Bill' : 'Create Bill'}
      </h1>

      {isEditMode ? (
        /* Edit mode: single-column, no upload panel */
        <div className="space-y-4">
          {formFields}
        </div>
      ) : (
        /* Create mode: always two-column — left panel switches between upload zone and PDF preview */
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="shrink-0 lg:sticky lg:top-8 lg:w-[44%] h-[480px] lg:h-auto lg:min-h-0">
            {hasPreview ? (
              <InvoicePreviewPanel onReset={() => setHasPreview(false)} />
            ) : (
              <InvoiceUpload onExtracted={handleExtracted} />
            )}
          </div>
          <div className="min-w-0 flex-1 space-y-4">
            {formFields}
          </div>
        </div>
      )}
    </div>
  )
}
