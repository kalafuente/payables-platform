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

// Column widths as percentages — shared between thead and tbody tables.
// Vendor is intentionally narrower than content-fit to keep the table compact.
const COL_WIDTHS = ['42%', '22%', '18%', '18%']

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
    <div className="bg-surface overflow-hidden rounded-lg">
      {/* overflow-x-auto lets the table scroll on narrow viewports instead of
          compressing columns. min-w ensures column percentages stay meaningful. */}
      <div className="overflow-x-auto">
      <div className="min-w-[600px]">

      {/* Static header — never animates */}
      <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
        <ColGroup />
        <thead className="border-b border-line">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                const alignRight = header.column.columnDef.meta?.align === 'right'

                return (
                  <th
                    key={header.id}
                    className={cn(
                      'px-5 py-2.5 text-xs font-medium text-ink-muted',
                      alignRight ? 'text-right' : 'text-left',
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
              onClick={() => router.push(`/bills/${row.original.id}`)}
              className="border-b border-line last:border-0 hover:bg-slate-100 transition-colors duration-75 cursor-pointer"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={cn(
                    'px-5 py-3 text-sm',
                    cell.column.columnDef.meta?.align === 'right' && 'text-right',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>

      </div>
      </div>
    </div>
  )
}
