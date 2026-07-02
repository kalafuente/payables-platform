interface VendorEmptyStateProps {
  hasSearch: boolean
}

export function VendorEmptyState({ hasSearch }: VendorEmptyStateProps) {
  const heading = hasSearch ? 'No results found' : 'No vendors yet'
  const body = hasSearch
    ? 'Try a different search term or clear the filter.'
    : 'Create a bill for a new vendor to see them here.'

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-medium text-ink">{heading}</p>
      <p className="mt-1 text-sm text-ink-muted">{body}</p>
    </div>
  )
}
