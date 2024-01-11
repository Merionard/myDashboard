/*
  Warnings:

  - You are about to drop the column `validateAd` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "validateAd",
ADD COLUMN     "validateAt" TIMESTAMP(3),
ALTER COLUMN "payedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Compteur" (
    "type" "InvoiceType" NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Compteur_pkey" PRIMARY KEY ("type")
);
