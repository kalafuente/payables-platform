-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('created', 'submitted', 'approved', 'changes_requested', 'scheduled', 'paid');

-- CreateTable
CREATE TABLE "ActivityEntry" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "label" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActivityEntry_billId_idx" ON "ActivityEntry"("billId");

-- CreateIndex
CREATE INDEX "ActivityEntry_createdAt_idx" ON "ActivityEntry"("createdAt");

-- AddForeignKey
ALTER TABLE "ActivityEntry" ADD CONSTRAINT "ActivityEntry_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
