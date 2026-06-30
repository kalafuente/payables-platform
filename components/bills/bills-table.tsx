'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import type { Bill } from '@/lib/mock-bills'
import { columns } from './columns'

// Percentages must sum to 100 and stay in sync with loading.tsx.
// Vendor carries most content; Actions (Review) is intentionally narrow.
const COL_WIDTHS = ['37%', '18%', '15%', '16%', '14%']

function ColGroup() {
  return (
    <colgroup>
      {COL_WIDTHS.map((w, i) => (
        <col key={i} style={{ width: w }} />
      ))}
    </colgroup>
  )
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  return (
    <span className="ml-1.5 inline-flex flex-col gap-[2px] shrink-0" aria-hidden="true">
      <svg viewBox="0 0 6 4" className={cn('size-[5px]', sorted === 'asc' ? 'text-ink' : 'text-ink-disabled')} fill="currentColor">
        <path d="M3 0L6 4H0z" />
      </svg>
      <svg viewBox="0 0 6 4" className={cn('size-[5px]', sorted === 'desc' ? 'text-ink' : 'text-ink-disabled')} fill="currentColor">
        <path d="M3 4L0 0H6z" />
      </svg>
    </span>
  )
}

// Per-column horizontal padding:
//   - First column: content aligns with the page title and tabs (lg:pl-8 = same as toolbar px-8)
//   - Last column:  content aligns with the right edge of the toolbar (lg:pr-8)
//   - Middle:       uniform px-4
function thPadding(i: number, total: number) {
  if (i === 0)          return 'pl-5 lg:pl-8 pr-4'
  if (i === total - 1)  return 'pl-4 pr-5 lg:pr-8'
  return 'px-4'
}
function tdPadding(i: number, total: number) {
  if (i === 0)          return 'pl-5 lg:pl-8 pr-4'
  if (i === total - 1)  return 'pl-4 pr-5 lg:pr-8'
  return 'px-4'
}

interface BillsTableProps {
  bills: Bill[]
  animationKey: string
}

export function BillsTable({ bills, animationKey }: BillsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const router = useRouter()

  const table = useReactTable({
    data: bills,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="bg-surface overflow-hidden rounded-lg lg:rounded-none">
      {/* overflow-x-auto lets the table scroll on narrow viewports; min-w keeps
          column percentages meaningful when the viewport is narrower than 700px. */}
      <div className="overflow-x-auto">
      <div className="min-w-[700px]">

      {/* Static header — never animates */}
      <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
        <ColGroup />
        <thead className="border-b border-line">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i, arr) => {
                const canSort   = header.column.getCanSort()
                const sorted    = header.column.getIsSorted()
                const alignRight = header.column.columnDef.meta?.align === 'right'
                const isLast    = i === arr.length - 1

                return (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={
                      canSort
                        ? (sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none')
                        : undefined
                    }
                    className={cn(
                      'py-2.5 text-xs font-medium text-ink-muted',
                      thPadding(i, arr.length),
                      alignRight ? 'text-right' : 'text-left',
                      !isLast && ('border-r border-line'),
                    )}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className="inline-flex items-center cursor-pointer select-none"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <SortIcon sorted={sorted} />
                      </button>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
      </table>

      {/* Animated rows — keyed per filter so rows replay enter animation on tab switch */}
      <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
        <ColGroup />
        <tbody>
          {table.getRowModel().rows.map(row => (
            <motion.tr
              key={`${animationKey}-${row.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] }}
              tabIndex={0}
              aria-label={`${row.original.vendorName}, ${row.original.invoiceNumber}`}
              onClick={() => router.push(`/bills/${row.original.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  router.push(`/bills/${row.original.id}`)
                }
              }}
              className="border-b border-line last:border-0 hover:bg-slate-50 focus-visible:bg-slate-50 transition-colors duration-75 cursor-pointer"
            >
              {row.getVisibleCells().map((cell, i, arr) => {
                const isLast = i === arr.length - 1
                return (
                  <td
                    key={cell.id}
                    className={cn(
                      'py-3 text-sm',
                      tdPadding(i, arr.length),
                      cell.column.columnDef.meta?.align === 'right' && 'text-right',
                      !isLast && ('border-r border-line'),
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>

      </div>
      </div>
    </div>
  )
}
