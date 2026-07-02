'use client'

import { useState, useTransition } from 'react'
import { Dialog } from '@/components/ui/dialog'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createVendor, updateVendor } from '@/app/actions'
import type { VendorOption } from '@/lib/mock-bills'

interface VendorFormDialogProps {
  open: boolean
  onClose: () => void
  onSaved: (vendor: VendorOption) => void
  /** Pre-filled name (e.g. from search text when creating) */
  initialName?: string
  /** Provide to switch to edit mode */
  editVendor?: VendorOption
}

/**
 * Callers must increment the `key` prop each time they open this dialog so the
 * component remounts with fresh state. Using useState initialized from props
 * avoids setState-in-effect, which is flagged by the React Compiler lint rule.
 */
export function VendorFormDialog({
  open,
  onClose,
  onSaved,
  initialName = '',
  editVendor,
}: VendorFormDialogProps) {
  const isEdit = !!editVendor

  const [name,   setName]   = useState(editVendor?.name  ?? initialName)
  const [email,  setEmail]  = useState(editVendor?.email ?? '')
  const [errors, setErrors] = useState<{ name?: string; root?: string }>({})
  const [isPending, startTransition] = useTransition()

  function handleSave() {
    if (!name.trim()) { setErrors({ name: 'Vendor name is required.' }); return }
    setErrors({})

    startTransition(async () => {
      if (isEdit) {
        const result = await updateVendor(editVendor!.id, { name, email })
        if (result.error) { setErrors({ root: result.error }); return }
        onSaved({ id: editVendor!.id, name: name.trim(), email: email.trim() || null })
      } else {
        const result = await createVendor({ name, email })
        if (result.error) { setErrors({ root: result.error }); return }
        onSaved(result.vendor!)
      }
      onClose()
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isEdit ? 'Edit vendor' : 'New vendor'}
    >
      <div className="p-5 space-y-4">
        <FormField
          label="Name"
          htmlFor="vendor-dialog-name"
          required
          error={errors.name ?? errors.root}
        >
          <Input
            id="vendor-dialog-name"
            value={name}
            onChange={e => { setName(e.target.value); setErrors({}) }}
            placeholder="Acme Corp"
            disabled={isPending}
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="vendor-dialog-email"
          description="Optional. Used for remittance notices."
        >
          <Input
            id="vendor-dialog-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="billing@acme.com"
            disabled={isPending}
            onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
          />
        </FormField>
      </div>

      <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-line">
        <Button variant="ghost" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} loading={isPending}>
          {isEdit ? 'Save changes' : 'Create vendor'}
        </Button>
      </div>
    </Dialog>
  )
}
