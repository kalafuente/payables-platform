'use client'

import { cn } from '@/lib/utils'
import { SearchIcon, XIcon } from '@/components/icons'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchInput({ value, onChange, placeholder = 'Search…', className }: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <span className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-subtle">
        <SearchIcon />
      </span>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'h-8 w-full rounded-full border border-line bg-surface text-sm text-ink',
          'pl-8 pr-8',
          'placeholder:text-ink-subtle',
          'focus:outline-none focus:border-line-strong focus:ring-2 focus:ring-accent',
          'transition-colors duration-100',
        )}
      />

      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 cursor-pointer text-ink-subtle hover:text-ink"
          aria-label="Clear search"
        >
          <XIcon />
        </button>
      )}
    </div>
  )
}
