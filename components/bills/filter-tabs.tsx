'use client'

import { cn } from '@/lib/utils'
import type { BillStatus } from '@/lib/mock-bills'

export type FilterStatus = BillStatus | 'all'

interface FilterTabsProps {
  active: FilterStatus
  counts: Record<string, number>
  onChange: (status: FilterStatus) => void
}

const TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'draft',     label: 'Draft' },
  { value: 'pending',   label: 'Pending' },
  { value: 'approved',  label: 'Approved' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'paid',      label: 'Paid' },
  { value: 'overdue',   label: 'Overdue' },
]

export function FilterTabs({ active, counts, onChange }: FilterTabsProps) {
  return (
    <div className="flex items-end gap-0 border-b border-line">
      {TABS.map(({ value, label }) => {
        const isActive = active === value
        const count = counts[value] ?? 0

        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2.5 text-sm whitespace-nowrap',
              'cursor-pointer transition-colors duration-100',
              '-mb-px border-b-2',
              isActive
                ? 'text-ink font-medium border-primary'
                : 'text-ink-muted border-transparent hover:text-ink',
            )}
          >
            {label}
            <span className={cn(
              'text-xs tabular-nums',
              isActive ? 'text-ink-subtle' : 'text-ink-disabled',
            )}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
