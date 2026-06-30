'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { Prisma } from '@/lib/generated/prisma/client'

export interface CreateBillInput {
  vendorName: string
  invoiceNumber: string
  invoiceDate: string // 'YYYY-MM-DD'
  dueDate: string     // 'YYYY-MM-DD'
  memo: string
  lineItems: Array<{
    description: string
    quantity: number
    unitPrice: number
  }>
}

export interface ActionResult {
  error?: string
}

export async function createBill(input: CreateBillInput): Promise<ActionResult> {
  try {
    let vendor = await db.vendor.findFirst({ where: { name: input.vendorName } })
    if (!vendor) {
      vendor = await db.vendor.create({ data: { name: input.vendorName } })
    }

    const validItems = input.lineItems.filter(li => li.description.trim())

    // Integer arithmetic avoids IEEE 754 drift on monetary values.
    const totalCents = validItems.reduce(
      (sum, li) => sum + Math.round(li.quantity * li.unitPrice * 100),
      0
    )

    const bill = await db.bill.create({
      data: {
        vendorId:      vendor.id,
        invoiceNumber: input.invoiceNumber,
        invoiceDate:   new Date(`${input.invoiceDate}T12:00:00Z`),
        dueDate:       new Date(`${input.dueDate}T12:00:00Z`),
        amount:        (totalCents / 100).toFixed(2),
        status:        'draft',
        memo:          input.memo || undefined,
        lineItems: {
          createMany: {
            data: validItems.map((li, i) => ({
              description: li.description.trim(),
              quantity:    li.quantity.toFixed(4),
              unitPrice:   li.unitPrice.toFixed(2),
              amount:      (Math.round(li.quantity * li.unitPrice * 100) / 100).toFixed(2),
              sortOrder:   i,
            })),
          },
        },
      },
      select: { id: true },
    })

    await db.activityEntry.create({
      data: {
        billId: bill.id,
        type:   'created',
        label:  'Bill created',
        actor:  'Karen L.',
      },
    })

    revalidatePath('/bills')
    revalidatePath('/dashboard')
    return {}
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return { error: 'A bill with this invoice number already exists for this vendor.' }
    }
    throw err
  }
}

export async function submitForApproval(billId: string): Promise<void> {
  await db.bill.update({
    where: { id: billId },
    data:  { status: 'pending' },
  })

  await db.activityEntry.create({
    data: {
      billId,
      type:  'submitted',
      label: 'Submitted for approval',
      actor: 'Karen L.',
    },
  })

  revalidatePath('/bills')
  revalidatePath('/dashboard')
  revalidatePath(`/bills/${billId}`)
}

export async function updateBill(billId: string, input: CreateBillInput): Promise<ActionResult> {
  try {
    let vendor = await db.vendor.findFirst({ where: { name: input.vendorName } })
    if (!vendor) {
      vendor = await db.vendor.create({ data: { name: input.vendorName } })
    }

    const validItems = input.lineItems.filter(li => li.description.trim())
    const totalCents = validItems.reduce(
      (sum, li) => sum + Math.round(li.quantity * li.unitPrice * 100),
      0
    )

    await db.bill.update({
      where: { id: billId },
      data: {
        vendorId:      vendor.id,
        invoiceNumber: input.invoiceNumber,
        invoiceDate:   new Date(`${input.invoiceDate}T12:00:00Z`),
        dueDate:       new Date(`${input.dueDate}T12:00:00Z`),
        amount:        (totalCents / 100).toFixed(2),
        memo:          input.memo || null,
      },
    })

    // Replace line items: simpler than diffing, and the set is always small.
    await db.lineItem.deleteMany({ where: { billId } })
    if (validItems.length > 0) {
      await db.lineItem.createMany({
        data: validItems.map((li, i) => ({
          billId,
          description: li.description.trim(),
          quantity:    li.quantity.toFixed(4),
          unitPrice:   li.unitPrice.toFixed(2),
          amount:      (Math.round(li.quantity * li.unitPrice * 100) / 100).toFixed(2),
          sortOrder:   i,
        })),
      })
    }

    await db.activityEntry.create({
      data: {
        billId,
        type:  'updated',
        label: 'Bill updated',
        actor: 'Karen L.',
      },
    })

    revalidatePath('/bills')
    revalidatePath('/dashboard')
    revalidatePath(`/bills/${billId}`)
    return {}
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return { error: 'A bill with this invoice number already exists for this vendor.' }
    }
    throw err
  }
}

export async function approveBill(billId: string): Promise<void> {
  await db.bill.update({
    where: { id: billId },
    data:  { status: 'approved' },
  })

  await db.activityEntry.create({
    data: {
      billId,
      type:  'approved',
      label: 'Approved',
      actor: 'Karen L.',
    },
  })

  revalidatePath('/bills')
  revalidatePath('/dashboard')
  revalidatePath(`/bills/${billId}`)
}
