'use client'

import { PdfIcon } from '@/components/icons'

interface InvoicePreviewPanelProps {
  onReset: () => void
}

export function InvoicePreviewPanel({ onReset }: InvoicePreviewPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <PdfIcon className="size-4 shrink-0 text-ink-subtle" />
          <span className="text-sm font-medium text-ink truncate">
            vercel-invoice-preview.pdf
          </span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="shrink-0 text-sm text-ink-muted hover:text-ink transition-colors duration-100 cursor-pointer"
        >
          Change file
        </button>
      </div>

      {/* PDF viewer
          Mobile: fixed 480 px so the preview is readable without dominating the page.
          Desktop: fills from the sticky top-8 position to near the viewport bottom. */}
      <div className="min-h-0 flex-1">
        <iframe
          src="/vercel-invoice-preview.pdf"
          title="Invoice preview"
          className="h-full w-full border-0"
        />
      </div>
    </div>
  )
}
