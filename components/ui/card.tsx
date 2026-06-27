import { cn } from '@/lib/utils'

export interface CardProps {
  className?: string
  children: React.ReactNode
}

/**
 * Base surface container. No default padding — sections within a card
 * control their own spacing to support headers, dividers, and content areas.
 *
 * Usage:
 *   <Card className="p-6">...</Card>
 *   <Card>
 *     <div className="px-6 py-5 border-b border-line">Header</div>
 *     <div className="p-6">Content</div>
 *   </Card>
 */
export function Card({ className, children }: CardProps) {
  return (
    <div className={cn('bg-surface border border-line rounded-sm', className)}>
      {children}
    </div>
  )
}
