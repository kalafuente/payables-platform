'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { VendorFormDialog } from './vendor-form-dialog'
import type { VendorOption } from '@/lib/mock-bills'

export function EditVendorButton({ vendor }: { vendor: VendorOption }) {
  const [open, setOpen]       = useState(false)
  const [dialogKey, setKey]   = useState(0)
  const router = useRouter()

  function handleOpen() {
    setKey(k => k + 1)
    setOpen(true)
  }

  return (
    <>
      <Button variant="secondary" size="sm" onClick={handleOpen}>
        Edit vendor
      </Button>

      <VendorFormDialog
        key={dialogKey}
        open={open}
        onClose={() => setOpen(false)}
        onSaved={() => {
          setOpen(false)
          router.refresh()
        }}
        editVendor={vendor}
      />
    </>
  )
}
