export type BillStatus =
  | 'draft'
  | 'pending'
  | 'approved'
  | 'scheduled'
  | 'paid'
  | 'overdue'

export const STATUS_LABELS: Record<BillStatus, string> = {
  draft:     'Draft',
  pending:   'Pending Approval',
  approved:  'Approved',
  scheduled: 'Scheduled',
  paid:      'Paid',
  overdue:   'Overdue',
}

export interface Bill {
  id: string
  vendorName: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  amount: number
  status: BillStatus
}

export interface LineItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export type ActivityEntryType =
  | 'created'
  | 'updated'
  | 'submitted'
  | 'approved'
  | 'changes_requested'
  | 'scheduled'
  | 'paid'

export interface ActivityEntry {
  id: string
  type: ActivityEntryType
  label: string
  actor: string
  date: string
}

export interface ActivityFeedEntry extends ActivityEntry {
  billId: string
  vendorName: string
}

export interface BillDetail extends Bill {
  vendorId: string
  lineItems: LineItem[]
  activity: ActivityEntry[]
}

export interface VendorOption {
  id: string
  name: string
  email: string | null
}

export interface Vendor {
  id: string
  name: string
  billCount: number
  outstandingAmount: number
  lastInvoiceDate: string | null
}

export interface VendorActivityEntry extends ActivityEntry {
  billId: string
  invoiceNumber: string
}

export interface VendorDetail {
  id: string
  name: string
  email: string | null
  createdAt: string
  outstandingBalance: number
  totalBills: number
  bills: Bill[]
  recentActivity: VendorActivityEntry[]
}
