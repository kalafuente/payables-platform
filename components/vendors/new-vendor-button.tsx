'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@/components/icons'
import { VendorFormDialog } from './vendor-form-dialog'

export function NewVendorButton() {
  const [open, setOpen]     = useState(false)
  const [dialogKey, setKey] = useState(0)
  const router = useRouter()

  function handleOpen() {
    setKey(k => k + 1)
    setOpen(true)
  }

  function handleSaved() {
    setOpen(false)
    router.refresh()
  }

  return (
    <>
      <Button variant="accent" onClick={handleOpen}>
        <PlusIcon className="size-3.5 shrink-0" />
        New Vendor
      </Button>

      <VendorFormDialog
        key={dialogKey}
        open={open}
        onClose={() => setOpen(false)}
        onSaved={handleSaved}
      />
    </>
  )
}
