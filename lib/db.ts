import { neonConfig } from '@neondatabase/serverless'
import ws from 'ws'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@/lib/generated/prisma/client'

// Node.js (non-Edge) requires an explicit WebSocket constructor for Neon's driver.
neonConfig.webSocketConstructor = ws

// Prevent multiple PrismaClient instances during Next.js hot-module replacement in dev.
const globalForPrisma = globalThis as unknown as { db?: PrismaClient }

function createClient(): PrismaClient {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

export const db = globalForPrisma.db ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.db = db
}
