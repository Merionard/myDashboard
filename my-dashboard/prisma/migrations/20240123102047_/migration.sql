/*
  Warnings:

  - A unique constraint covering the columns `[siren]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Invoice_customerSiren_key";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_siren_key" ON "Customer"("siren");
