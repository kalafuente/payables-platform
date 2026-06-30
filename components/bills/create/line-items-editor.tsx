'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import { XIcon, PlusIcon } from '@/components/icons'

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


const COL = 'grid grid-cols-[1fr_72px_128px_104px_32px] gap-x-3 items-center'

function LineItemsHeader() {
  return (
    <div className="px-6 py-3 border-b border-line">
      <h2 className="text-sm font-semibold text-ink">Line items</h2>
    </div>
  )
}

function LineItemsColumnLabels() {
  return (
    <div className={cn(COL, 'mb-2')}>
      <span className="text-xs font-medium text-ink-muted">Description</span>
      <span className="text-xs font-medium text-ink-muted">Qty</span>
      <span className="text-xs font-medium text-ink-muted">Unit price</span>
      <span className="text-xs font-medium text-ink-muted text-right">Amount</span>
      <span />
    </div>
  )
}

function LineItemRow({
  item,
  onUpdate,
  onRemove,
}: {
  item: LineItemDraft
  onUpdate: (field: keyof LineItemDraft, value: string) => void
  onRemove: () => void
}) {
  const amount = computeAmount(item)
  return (
    <div className={COL}>
      <Input
        value={item.description}
        onChange={e => onUpdate('description', e.target.value)}
        placeholder="Description"
        aria-label="Line item description"
      />
      <Input
        value={item.quantity}
        onChange={e => onUpdate('quantity', e.target.value)}
        inputMode="numeric"
        placeholder="1"
        aria-label="Quantity"
        className="text-right"
      />
      <Input
        value={item.unitPrice}
        onChange={e => onUpdate('unitPrice', e.target.value)}
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
        onClick={onRemove}
        className="flex h-9 w-8 items-center justify-center rounded-sm text-ink-subtle hover:text-overdue hover:bg-overdue-bg transition-colors duration-100 cursor-pointer"
      >
        <XIcon className="size-3.5" />
      </button>
    </div>
  )
}

function LineItemsFooter({ total, onAdd }: { total: number; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between border-t border-line px-6 py-3">
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors duration-100 cursor-pointer"
      >
        <PlusIcon className="size-3.5" />
        Add line item
      </button>

      <div className="flex items-center gap-4">
        <span className="text-sm text-ink-muted">Total</span>
        <span className="text-sm font-semibold text-ink tabular-nums">
          {formatCurrency(total)}
        </span>
      </div>
    </div>
  )
}

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
      <LineItemsHeader />

      <div className="px-6 py-3 space-y-1.5">
        <LineItemsColumnLabels />

        {items.length === 0 && (
          <p className="py-4 text-center text-sm text-ink-subtle">No line items yet.</p>
        )}

        {items.map(item => (
          <LineItemRow
            key={item.id}
            item={item}
            onUpdate={(field, value) => updateItem(item.id, field, value)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <LineItemsFooter total={total} onAdd={addItem} />
    </Card>
  )
}
