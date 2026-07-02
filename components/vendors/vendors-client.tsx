'use client'

import { useState, useMemo } from 'react'
import type { Vendor } from '@/lib/mock-bills'
import { SearchInput } from '@/components/ui/search-input'
import { VendorsTable } from './vendors-table'
import { VendorEmptyState } from './empty-state'

export function VendorsClient({ vendors }: { vendors: Vendor[] }) {
  const [search, setSearch] = useState('')

  const filteredVendors = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return vendors
    return vendors.filter(v => v.name.toLowerCase().includes(q))
  }, [vendors, search])

  const isEmpty = filteredVendors.length === 0

  return (
    <div>
      <div className="flex items-center justify-between p-4 lg:px-8 gap-4 bg-surface-subtle border-b border-line">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search vendor…"
          className="w-full sm:w-64"
        />
      </div>

      {isEmpty ? (
        <VendorEmptyState hasSearch={search.trim().length > 0} />
      ) : (
        <VendorsTable vendors={filteredVendors} />
      )}
    </div>
  )
}
