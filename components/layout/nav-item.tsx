'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItemProps {
  href: string
  label: string
  icon: React.ReactNode
}

export function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 px-3 h-8 rounded-sm text-sm transition-colors duration-100 cursor-pointer',
        isActive
          ? 'bg-slate-100 text-ink font-medium'
          : 'text-ink-muted hover:bg-slate-100 hover:text-ink',
      )}
    >
      <span className="size-4 shrink-0">{icon}</span>
      {label}
    </Link>
  )
}
