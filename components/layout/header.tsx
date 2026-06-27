export function Header() {
  return (
    <header className="h-[var(--header-height)] flex items-center justify-end px-6 bg-surface border-b border-line shrink-0">
      {/* Placeholder for future: global search, notifications, user menu */}
      <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
        <span className="text-[11px] font-semibold text-ink-subtle select-none">KL</span>
      </div>
    </header>
  )
}
