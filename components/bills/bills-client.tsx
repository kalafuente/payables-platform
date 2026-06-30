'use client'

import { useState, useMemo } from 'react'
import type { Bill, BillStatus } from '@/lib/mock-bills'
import { FilterTabs, type FilterStatus } from './filter-tabs'
import { SearchInput } from '@/components/ui/search-input'
import { BillsTable } from './bills-table'
import { EmptyState } from './empty-state'

export function BillsClient({ bills }: { bills: Bill[] }) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [search, setSearch] = useState('')

  // Tab counts reflect the full dataset so users see totals before filtering.
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: bills.length }
    for (const bill of bills) {
      counts[bill.status] = (counts[bill.status] ?? 0) + 1
    }
    return counts
  }, [bills])

  const filteredBills = useMemo(() => {
    const q = search.trim().toLowerCase()
    return bills.filter(bill => {
      const matchesTab = filterStatus === 'all' || bill.status === filterStatus
      const matchesSearch =
        !q ||
        bill.vendorName.toLowerCase().includes(q) ||
        bill.invoiceNumber.toLowerCase().includes(q)
      return matchesTab && matchesSearch
    })
  }, [bills, filterStatus, search])

  const isEmpty = filteredBills.length === 0

  return (
    <div>
      <FilterTabs
        active={filterStatus}
        counts={statusCounts}
        onChange={setFilterStatus}
      />

      <div className="flex items-center justify-between p-4 gap-4 bg-surface-subtle border-b border-line">
        <SearchInput value={search} onChange={setSearch} placeholder="Search vendor or invoice…" className="w-full sm:w-64" />
      </div>

      {isEmpty ? (
        <EmptyState
          hasSearch={search.trim().length > 0}
          filterStatus={filterStatus !== 'all' ? (filterStatus as BillStatus) : undefined}
        />
      ) : (
        <BillsTable bills={filteredBills} animationKey={filterStatus} />
      )}
    </div>
  )
}
