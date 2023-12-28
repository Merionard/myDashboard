/*
  Warnings:

  - You are about to drop the column `Siren` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `VATnumber` on the `Customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "Siren",
DROP COLUMN "VATnumber",
ADD COLUMN     "siren" TEXT,
ADD COLUMN     "vatNumber" TEXT;
