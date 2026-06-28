import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/format'
import { getRecentActivity } from '@/lib/dashboard-data'
import type { ActivityEntryType } from '@/lib/mock-bills'

const DOT_COLOR: Record<ActivityEntryType, string> = {
  created:           'bg-ink-disabled',
  submitted:         'bg-pending',
  approved:          'bg-approved',
  changes_requested: 'bg-pending',
  scheduled:         'bg-scheduled',
  paid:              'bg-paid',
}

export function RecentActivity() {
  const entries = getRecentActivity(8)

  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <h2 className="text-sm font-semibold text-ink">Recent Activity</h2>
        <Link
          href="/bills"
          className="text-xs text-ink-muted hover:text-ink transition-colors duration-100"
        >
          View all
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-ink-muted">No activity yet.</p>
        </div>
      ) : (
        <div>
          {entries.map(entry => (
            <Link
              key={entry.id}
              href={`/bills/${entry.billId}`}
              className="flex items-start gap-3 px-5 py-3.5 border-b border-line last:border-b-0 hover:bg-canvas transition-colors duration-100"
            >
              <div
                className={cn(
                  'mt-[5px] size-2 shrink-0 rounded-full',
                  DOT_COLOR[entry.type],
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug text-ink">
                  <span className="font-medium">{entry.vendorName}</span>
                  <span className="text-ink-muted"> · {entry.label}</span>
                </p>
                <p className="mt-0.5 text-xs text-ink-subtle">
                  {entry.actor} · {formatDate(entry.date)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Card>
  )
}
