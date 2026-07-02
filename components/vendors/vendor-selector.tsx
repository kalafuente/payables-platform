'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { VendorAvatar } from '@/components/ui/vendor-avatar'
import { XIcon, PlusIcon } from '@/components/icons'
import type { VendorOption } from '@/lib/mock-bills'

interface VendorSelectorProps {
  vendors: VendorOption[]
  value: VendorOption | null
  onChange: (v: VendorOption | null) => void
  onRequestCreate: (searchText: string) => void
  /** Pre-fills search text (e.g. from OCR extraction) when no vendor is selected */
  searchHint?: string
  disabled?: boolean
}

export function VendorSelector({
  vendors,
  value,
  onChange,
  onRequestCreate,
  searchHint = '',
  disabled = false,
}: VendorSelectorProps) {
  const [isOpen, setIsOpen]           = useState(false)
  const [internalSearch, setInternal] = useState('')
  const inputRef     = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Derive the visible search text: user input takes priority, otherwise show hint
  const search = value ? '' : (internalSearch || searchHint)

  // Close on outside mousedown
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const filtered = search.trim()
    ? vendors.filter(v => v.name.toLowerCase().includes(search.toLowerCase()))
    : vendors

  function select(v: VendorOption) {
    onChange(v)
    setInternal('')
    setIsOpen(false)
  }

  function clear() {
    onChange(null)
    setInternal('')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { setIsOpen(false); setInternal('') }
    if (e.key === 'ArrowDown' && !isOpen) setIsOpen(true)
  }

  // ── Selected state ─────────────────────────────────────────────────────────
  if (value) {
    return (
      <div className="flex items-center justify-between gap-2 min-h-[22px]">
        <div className="flex items-center gap-2 min-w-0">
          <VendorAvatar name={value.name} size={20} />
          <span className="text-sm text-ink truncate">{value.name}</span>
        </div>
        {!disabled && (
          <button
            type="button"
            onClick={clear}
            className="shrink-0 size-3.5 text-ink-subtle hover:text-ink transition-colors duration-100 cursor-pointer"
            aria-label={`Remove ${value.name}`}
          >
            <XIcon />
          </button>
        )}
      </div>
    )
  }

  // ── Search + dropdown state ────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        role="combobox"
        type="text"
        value={search}
        onChange={e => { setInternal(e.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search vendors…"
        disabled={disabled}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="vendor-listbox"
        className={cn(
          'w-full bg-transparent text-sm text-ink',
          'placeholder:text-ink-subtle',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      />

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 z-40 w-full min-w-[220px] border border-line bg-surface shadow-md">
          <ul
            id="vendor-listbox"
            role="listbox"
            aria-label="Vendors"
            className="max-h-48 overflow-y-auto py-1"
          >
            {filtered.length > 0 ? (
              filtered.map(v => (
                <li
                  key={v.id}
                  role="option"
                  aria-selected={false}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => select(v)}
                  className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors duration-75"
                >
                  <VendorAvatar name={v.name} size={24} />
                  <div className="min-w-0">
                    <p className="text-sm text-ink truncate">{v.name}</p>
                    {v.email && <p className="text-xs text-ink-subtle truncate">{v.email}</p>}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-ink-muted" role="option" aria-selected={false}>
                {search.trim() ? `No vendors match "${search}"` : 'No vendors yet'}
              </li>
            )}
          </ul>

          <div className="border-t border-line">
            <button
              type="button"
              onMouseDown={e => e.preventDefault()}
              onClick={() => {
                setIsOpen(false)
                onRequestCreate(internalSearch.trim() || searchHint.trim())
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-ink hover:bg-slate-50 transition-colors duration-75 cursor-pointer"
            >
              <PlusIcon className="size-3.5 shrink-0 text-ink-subtle" />
              {search.trim() ? `Create "${search.trim()}"` : 'Create new vendor'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
