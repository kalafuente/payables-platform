import { STATUS_LABELS, type BillStatus } from '@/lib/mock-bills'

interface EmptyStateProps {
  hasSearch: boolean
  filterStatus?: BillStatus
}

export function EmptyState({ hasSearch, filterStatus }: EmptyStateProps) {
  let heading = 'No bills yet'
  let body = 'Create your first bill to get started.'

  if (hasSearch) {
    heading = 'No results found'
    body = 'Try a different search term or clear the filter.'
  } else if (filterStatus) {
    heading = `No ${STATUS_LABELS[filterStatus].toLowerCase()} bills`
    body = 'Bills with this status will appear here.'
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-ink">{heading}</p>
      <p className="mt-1 text-sm text-ink-muted">{body}</p>
    </div>
  )
}
