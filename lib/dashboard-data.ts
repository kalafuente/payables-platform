import { MOCK_BILLS, getBillDetail, type Bill } from './mock-bills'
import type { ActivityEntry } from './mock-bills'

export function getOutstandingBills(): Bill[] {
  return MOCK_BILLS.filter(b => b.status !== 'paid')
}

export function getDraftBills(): Bill[] {
  return MOCK_BILLS.filter(b => b.status === 'draft')
}

export function getApprovedBills(): Bill[] {
  return MOCK_BILLS
    .filter(b => b.status === 'approved')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
}

export function getOverdueBills(): Bill[] {
  return MOCK_BILLS.filter(b => b.status === 'overdue')
}

export function getPendingBills(): Bill[] {
  return MOCK_BILLS.filter(b => b.status === 'pending')
}

export function getPaidBills(): Bill[] {
  return MOCK_BILLS.filter(b => b.status === 'paid')
}

export function sumAmount(bills: Bill[]): number {
  return bills.reduce((sum, b) => sum + b.amount, 0)
}

export interface ActivityFeedEntry extends ActivityEntry {
  billId: string
  vendorName: string
}

export function getRecentActivity(limit = 8): ActivityFeedEntry[] {
  const entries: ActivityFeedEntry[] = []
  for (const bill of MOCK_BILLS) {
    const detail = getBillDetail(bill.id)
    if (!detail) continue
    for (const entry of detail.activity) {
      entries.push({ ...entry, billId: bill.id, vendorName: bill.vendorName })
    }
  }
  // Sort by date desc, break ties by id desc (newest entry wins)
  return entries
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .slice(0, limit)
}
