'use client'

import { useState, useMemo } from 'react'
import { MOCK_BILLS, type BillStatus } from '@/lib/mock-bills'
import { FilterTabs, type FilterStatus } from './filter-tabs'
import { SearchInput } from './search-input'
import { BillsTable } from './bills-table'
import { EmptyState } from './empty-state'

// Tab counts are derived from the full dataset and don't change with search.
// This lets users see how many bills exist per status before switching tabs.
function getStatusCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: MOCK_BILLS.length }
  for (const bill of MOCK_BILLS) {
    counts[bill.status] = (counts[bill.status] ?? 0) + 1
  }
  return counts
}

const STATUS_COUNTS = getStatusCounts()

export function BillsClient() {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [search, setSearch] = useState('')

  const filteredBills = useMemo(() => {
    const q = search.trim().toLowerCase()
    return MOCK_BILLS.filter(bill => {
      const matchesTab = filterStatus === 'all' || bill.status === filterStatus
      const matchesSearch =
        !q ||
        bill.vendorName.toLowerCase().includes(q) ||
        bill.invoiceNumber.toLowerCase().includes(q)
      return matchesTab && matchesSearch
    })
  }, [filterStatus, search])

  const isEmpty = filteredBills.length === 0

  return (
    <div className="space-y-4">
      <FilterTabs
        active={filterStatus}
        counts={STATUS_COUNTS}
        onChange={setFilterStatus}
      />

      <div className="flex items-center justify-between gap-4">
        <SearchInput value={search} onChange={setSearch} />
        <p className="text-xs text-ink-subtle tabular-nums">
          {filteredBills.length} {filteredBills.length === 1 ? 'bill' : 'bills'}
        </p>
      </div>

      {isEmpty ? (
        <EmptyState
          hasSearch={search.trim().length > 0}
          filterStatus={filterStatus !== 'all' ? (filterStatus as BillStatus) : undefined}
        />
      ) : (
        <BillsTable bills={filteredBills} />
      )}
    </div>
  )
}
