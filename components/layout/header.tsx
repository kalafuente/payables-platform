'use client'

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M2 4h12M2 8h12M2 12h12" />
    </svg>
  )
}

interface HeaderProps {
  onToggleSidebar: () => void
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-[var(--header-height)] flex items-center gap-4 px-4 lg:px-6 bg-surface border-b border-line shrink-0">
      {/* Hamburger — only visible below lg; hidden when sidebar is in normal flow */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden inline-flex items-center justify-center size-8 rounded text-ink-muted hover:bg-slate-100 hover:text-ink transition-colors duration-100"
        aria-label="Open navigation"
      >
        <MenuIcon />
      </button>

      {/* User avatar — pushed to the right */}
      <div className="ml-auto size-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
        <span className="text-[11px] font-semibold text-ink-subtle select-none">KL</span>
      </div>
    </header>
  )
}
