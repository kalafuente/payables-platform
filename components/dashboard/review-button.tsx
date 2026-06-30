'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function ReviewButton({ href }: { href: string }) {
  const router = useRouter()
  return (
    <Button
      variant="secondary"
      size="sm"
      className="relative z-10 shrink-0"
      onClick={() => router.push(href)}
    >
      Review
    </Button>
  )
}
