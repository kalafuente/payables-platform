import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn('bg-slate-100 motion-safe:animate-pulse', className)}
      style={style}
    />
  )
}
