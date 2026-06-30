'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BillStatus } from '@/lib/mock-bills'

export type FilterStatus = BillStatus | 'all'

interface FilterTabsProps {
  active: FilterStatus
  counts: Record<string, number>
  onChange: (status: FilterStatus) => void
  className?: string
}

const TABS: { value: FilterStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
]

export function FilterTabs({ active, counts, onChange, className }: FilterTabsProps) {
  const listRef = useRef<HTMLDivElement>(null)

  function handleKeyDown(e: React.KeyboardEvent) {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? []
    )
    const currentIndex = tabs.findIndex(t => t === document.activeElement)
    if (currentIndex === -1) return

    let nextIndex: number | null = null
    if (e.key === 'ArrowRight') { e.preventDefault(); nextIndex = (currentIndex + 1) % tabs.length }
    if (e.key === 'ArrowLeft') { e.preventDefault(); nextIndex = (currentIndex - 1 + tabs.length) % tabs.length }
    if (e.key === 'Home') { e.preventDefault(); nextIndex = 0 }
    if (e.key === 'End') { e.preventDefault(); nextIndex = tabs.length - 1 }

    if (nextIndex !== null) {
      tabs[nextIndex].focus()
      onChange(TABS[nextIndex].value)
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Filter bills by status"
      onKeyDown={handleKeyDown}
      className={cn('flex items-end gap-0 border-b border-line overflow-x-auto scrollbar-none', className)}
    >
      {TABS.map(({ value, label }) => {
        const isActive = active === value
        const count = counts[value] ?? 0

        return (
          <button
            key={value}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(value)}
            className={cn(
              'relative inline-flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap',
              'cursor-pointer transition-colors duration-100',
              'pb-3',
              isActive ? 'text-ink font-medium' : 'text-ink-muted hover:text-ink',
            )}
          >
            {label}
            <span className={cn(
              'text-xs tabular-nums',
              isActive ? 'text-ink-subtle' : 'text-ink-disabled',
            )}>
              {count}
            </span>

            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
