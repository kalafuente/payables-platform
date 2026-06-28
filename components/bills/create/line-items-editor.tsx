'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'

export interface LineItemDraft {
  id: string
  description: string
  quantity: string
  unitPrice: string
}

interface LineItemsEditorProps {
  items: LineItemDraft[]
  onChange: (items: LineItemDraft[]) => void
}

function computeAmount(item: LineItemDraft): number {
  const qty = parseFloat(item.quantity) || 0
  const price = parseFloat(item.unitPrice) || 0
  return qty * price
}

let _counter = 0
export function nextLineItemId(): string {
  return `li-${Date.now()}-${++_counter}`
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-3.5"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  )
}

const COL = 'grid grid-cols-[1fr_72px_128px_104px_32px] gap-x-3 items-center'

export function LineItemsEditor({ items, onChange }: LineItemsEditorProps) {
  function updateItem(id: string, field: keyof LineItemDraft, value: string) {
    onChange(items.map(item => (item.id === id ? { ...item, [field]: value } : item)))
  }

  function removeItem(id: string) {
    onChange(items.filter(item => item.id !== id))
  }

  function addItem() {
    onChange([...items, { id: nextLineItemId(), description: '', quantity: '1', unitPrice: '' }])
  }

  const total = items.reduce((sum, item) => sum + computeAmount(item), 0)

  return (
    <Card>
      {/* Header */}
      <div className="px-6 py-4 border-b border-line">
        <h2 className="text-sm font-semibold text-ink">Line items</h2>
      </div>

      <div className="px-6 py-4 space-y-1.5">
        {/* Column labels */}
        <div className={cn(COL, 'mb-2')}>
          <span className="text-xs font-medium text-ink-muted">Description</span>
          <span className="text-xs font-medium text-ink-muted">Qty</span>
          <span className="text-xs font-medium text-ink-muted">Unit price</span>
          <span className="text-xs font-medium text-ink-muted text-right">Amount</span>
          <span />
        </div>

        {/* Rows */}
        {items.length === 0 && (
          <p className="py-4 text-center text-sm text-ink-subtle">No line items yet.</p>
        )}

        {items.map(item => {
          const amount = computeAmount(item)
          return (
            <div key={item.id} className={COL}>
              <Input
                value={item.description}
                onChange={e => updateItem(item.id, 'description', e.target.value)}
                placeholder="Description"
                aria-label="Line item description"
              />
              <Input
                value={item.quantity}
                onChange={e => updateItem(item.id, 'quantity', e.target.value)}
                inputMode="numeric"
                placeholder="1"
                aria-label="Quantity"
                className="text-right"
              />
              <Input
                value={item.unitPrice}
                onChange={e => updateItem(item.id, 'unitPrice', e.target.value)}
                inputMode="decimal"
                placeholder="0.00"
                aria-label="Unit price"
                className="text-right"
              />
              <span className={cn(
                'h-9 flex items-center justify-end text-sm',
                amount > 0 ? 'text-ink' : 'text-ink-subtle',
              )}>
                {amount > 0 ? formatCurrency(amount) : '—'}
              </span>
              <button
                type="button"
                aria-label="Remove line item"
                onClick={() => removeItem(item.id)}
                className="flex h-9 w-8 items-center justify-center rounded-sm text-ink-subtle hover:text-overdue hover:bg-overdue-bg transition-colors duration-100 cursor-pointer"
              >
                <XIcon />
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer: add row + total */}
      <div className="flex items-center justify-between border-t border-line px-6 py-3">
        <button
          type="button"
          onClick={addItem}
          className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100 cursor-pointer"
        >
          <PlusIcon />
          Add line item
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-muted">Total</span>
          <span className="text-sm font-semibold text-ink tabular-nums">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </Card>
  )
}
