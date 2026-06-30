'use client'

import { cn } from '@/lib/utils'
import { NavItem } from './nav-item'
import { GridIcon, ReceiptIcon } from '@/components/icons'

// ── Navigation config ──────────────────────────────────────────────────────────

const navigation = [
  { href: '/dashboard', label: 'Dashboard', icon: <GridIcon /> },
  { href: '/bills', label: 'Bills', icon: <ReceiptIcon /> },
]

// ── Sidebar ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  isOpen?: boolean
}

export function Sidebar({ isOpen = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-[var(--sidebar-width)] flex flex-col bg-sidebar border-r border-line shrink-0',
        // Small screens: fixed overlay that slides in/out from the left.
        // z-50 places it above the z-40 backdrop.
        'fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        // Large screens: restore to normal flow, always visible.
        'lg:relative lg:translate-x-0',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-[var(--header-height)] shrink-0">
        <span className="text-sm font-semibold text-ink tracking-tight">Payables</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </nav>
    </aside>
  )
}
