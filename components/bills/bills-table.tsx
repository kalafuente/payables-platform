'use client'

import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
} from '@tanstack/react-table'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Bill } from '@/lib/mock-bills'
import { columns } from './columns'

interface BillsTableProps {
  bills: Bill[]
}

function SortIcon({ sorted }: { sorted: false | 'asc' | 'desc' }) {
  return (
    <span className="ml-1 inline-flex flex-col gap-[2px] shrink-0" aria-hidden="true">
      <svg viewBox="0 0 6 4" className={cn('size-[5px]', sorted === 'asc' ? 'text-ink' : 'text-ink-disabled')} fill="currentColor">
        <path d="M3 0L6 4H0z" />
      </svg>
      <svg viewBox="0 0 6 4" className={cn('size-[5px]', sorted === 'desc' ? 'text-ink' : 'text-ink-disabled')} fill="currentColor">
        <path d="M3 4L0 0H6z" />
      </svg>
    </span>
  )
}

export function BillsTable({ bills }: BillsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: bills,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <Card className="overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50 border-b border-line">
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
                      'px-4 py-3 text-xs font-medium text-ink-muted',
                      alignRight ? 'text-right' : 'text-left',
                    )}
                  >
                    {header.isPlaceholder ? null : canSort ? (
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className={cn(
                          'inline-flex items-center cursor-pointer select-none group',
                          alignRight && 'flex-row-reverse',
                        )}
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

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-line last:border-0 hover:bg-slate-50 transition-colors duration-75 cursor-pointer"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={cn(
                    'px-4 py-3.5 text-sm',
                    cell.column.columnDef.meta?.align === 'right' && 'text-right',
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
