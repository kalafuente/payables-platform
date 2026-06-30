'use client'

import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { UploadCloudIcon, CheckIcon } from '@/components/icons'

export interface OCRResult {
  vendor: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  lineItems: Array<{ description: string; quantity: string; unitPrice: string }>
}

const MOCK_OCR: OCRResult = {
  vendor: 'Vercel, Inc.',
  invoiceNumber: 'INV-2026-VCL',
  invoiceDate: '2026-06-15',
  dueDate: '2026-07-15',
  lineItems: [
    { description: 'Pro team plan — annual', quantity: '1', unitPrice: '1800' },
    { description: 'Build minutes overage', quantity: '1', unitPrice: '600' },
  ],
}

type Phase = 'idle' | 'uploading' | 'extracting' | 'done'

interface InvoiceUploadProps {
  onExtracted: (data: OCRResult) => void
}


function LoadingSpinner() {
  return (
    <div
      aria-hidden="true"
      className="size-4 shrink-0 rounded-full border-2 border-line border-t-ink-muted animate-spin"
    />
  )
}

export function InvoiceUpload({ onExtracted }: InvoiceUploadProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [fileName, setFileName] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function simulateUpload(file: File) {
    setFileName(file.name)
    setPhase('uploading')
    await new Promise(r => setTimeout(r, 500))
    setPhase('extracting')
    await new Promise(r => setTimeout(r, 1500))
    setPhase('done')
    onExtracted(MOCK_OCR)
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0]
    if (file) simulateUpload(file)
  }

  function reset() {
    setPhase('idle')
    setFileName('')
    setIsDragOver(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  if (phase === 'done') {
    return (
      <div className="flex items-center justify-between gap-4 rounded-sm border border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-emerald-600">
            <CheckIcon className="size-4 shrink-0" />
          </span>
          <span className="text-sm font-medium text-ink truncate">{fileName}</span>
          <span className="text-ink-subtle" aria-hidden="true">·</span>
          <span className="text-sm text-ink-muted shrink-0">Data extracted</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-sm text-ink-muted hover:text-ink transition-colors duration-100 shrink-0 cursor-pointer"
        >
          Change file
        </button>
      </div>
    )
  }

  const isProcessing = phase === 'uploading' || phase === 'extracting'

  return (
    <div
      role="button"
      tabIndex={isProcessing ? -1 : 0}
      aria-label="Upload invoice"
      onDragOver={e => { e.preventDefault(); if (!isProcessing) setIsDragOver(true) }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={e => {
        e.preventDefault()
        setIsDragOver(false)
        if (!isProcessing) handleFiles(e.dataTransfer.files)
      }}
      onClick={() => { if (!isProcessing) inputRef.current?.click() }}
      onKeyDown={e => { if (!isProcessing && (e.key === 'Enter' || e.key === ' ')) inputRef.current?.click() }}
      className={cn(
        'h-full rounded-sm border-2 border-dashed flex flex-col items-center justify-center',
        'transition-colors duration-100',
        isProcessing
          ? 'cursor-default border-line'
          : isDragOver
            ? 'cursor-copy border-ink-muted bg-slate-50'
            : 'cursor-pointer border-line hover:border-line-strong',
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
        tabIndex={-1}
      />

      {phase === 'idle' && (
        <div className="flex flex-col items-center gap-3">
          <UploadCloudIcon className="size-8 text-ink-subtle" />
          <div>
            <p className="text-sm font-medium text-ink">Drag &amp; drop invoice</p>
            <p className="mt-0.5 text-sm text-ink-muted">or click to browse</p>
          </div>
          <p className="text-xs text-ink-subtle">PDF, PNG, JPG — up to 10 MB</p>
        </div>
      )}

      {phase === 'uploading' && (
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner />
          <p className="text-sm text-ink-muted">Uploading {fileName}…</p>
        </div>
      )}

      {phase === 'extracting' && (
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner />
          <p className="text-sm text-ink-muted">Extracting invoice data…</p>
        </div>
      )}
    </div>
  )
}
