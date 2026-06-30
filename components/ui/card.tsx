import { cn } from '@/lib/utils'

export interface CardProps {
  className?: string
  children: React.ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-surface border border-line', className)}>
      {children}
    </div>
  )
}
