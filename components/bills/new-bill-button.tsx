'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function NewBillButton() {
  const router = useRouter()
  return (
    <Button variant="accent" onClick={() => router.push('/bills/new')}>
      New Bill
    </Button>
  )
}
