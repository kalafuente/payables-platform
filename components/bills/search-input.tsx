'use client'

import { cn } from '@/lib/utils'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  )
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-64">
      <span className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-subtle">
        <SearchIcon />
      </span>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search vendor or invoice…"
        className={cn(
          'h-8 w-full rounded-sm border border-line bg-surface text-sm text-ink',
          'pl-8 pr-8',
          'placeholder:text-ink-subtle',
          'focus:outline-none focus:border-line-strong focus:ring-1 focus:ring-line-strong',
          'transition-colors duration-100',
        )}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 cursor-pointer text-ink-subtle hover:text-ink"
          aria-label="Clear search"
        >
          <ClearIcon />
        </button>
      )}
    </div>
  )
}
