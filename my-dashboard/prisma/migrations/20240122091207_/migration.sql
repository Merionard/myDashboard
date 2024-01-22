/*
  Warnings:

  - A unique constraint covering the columns `[customerSiren]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pathImg" TEXT,
ADD COLUMN     "typeActivite" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_customerSiren_key" ON "Invoice"("customerSiren");
