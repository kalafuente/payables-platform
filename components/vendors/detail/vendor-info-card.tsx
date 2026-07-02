import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/format'
import { EditVendorButton } from '@/components/vendors/edit-vendor-button'
import type { VendorDetail } from '@/lib/mock-bills'

export function VendorInfoCard({ vendor }: { vendor: VendorDetail }) {
  return (
    <Card className="overflow-hidden">
      <div className="px-5 py-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
          Contact
        </p>
        {vendor.email ? (
          <p className="text-sm text-ink break-all">{vendor.email}</p>
        ) : (
          <p className="text-sm text-ink-muted">No email on file</p>
        )}
      </div>

      <div className="border-t border-line" />

      <div className="px-5 py-5">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-ink-subtle">
          Vendor since
        </p>
        <p className="text-sm text-ink">{formatDate(vendor.createdAt)}</p>
      </div>

      <div className="border-t border-line" />

      <div className="px-5 py-4">
        <EditVendorButton
          vendor={{ id: vendor.id, name: vendor.name, email: vendor.email }}
        />
      </div>
    </Card>
  )
}
