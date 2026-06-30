'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { useToast } from '@/components/ui/toaster'

export function LoadingDemo({
  variant = 'primary',
  label,
  loadingLabel,
}: {
  variant?: 'accent' | 'primary' | 'danger'
  label: string
  loadingLabel: string
}) {
  const [loading, setLoading] = useState(false)
  function trigger() {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }
  return (
    <Button variant={variant} loading={loading} onClick={trigger}>
      {loading ? loadingLabel : label}
    </Button>
  )
}

export function SearchDemo({ placeholder, className }: { placeholder?: string; className?: string }) {
  const [value, setValue] = useState('')
  return (
    <SearchInput
      value={value}
      onChange={setValue}
      placeholder={placeholder ?? 'Search…'}
      className={className}
    />
  )
}

export function ToastDemo() {
  const { toast } = useToast()
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast({ variant: 'success', title: 'Bill created', description: 'The invoice has been saved as a draft.' })}
        >
          Success
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast({ variant: 'info', title: 'Syncing vendor data', description: 'Records are being updated in the background.' })}
        >
          Info
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast({ variant: 'warning', title: 'Payment may be delayed', description: 'Bank processing times are extended this week.' })}
        >
          Warning
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => toast({ variant: 'error', title: 'Could not create bill', description: 'A bill with this invoice number already exists.' })}
        >
          Error
        </Button>
      </div>
      <p className="text-xs text-ink-subtle">
        Toasts auto-dismiss after 4.5 s. Click × to dismiss early.
      </p>
    </div>
  )
}
