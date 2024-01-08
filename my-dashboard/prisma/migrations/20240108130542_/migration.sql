-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'CANCELED', 'VALIDATED', 'PAYED');

-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('INVOICE', 'CREDIT_NOTE');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "type" "InvoiceType" NOT NULL,
    "statut" "InvoiceStatus" NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerSociety" TEXT,
    "customerSiren" TEXT,
    "customerVatNumber" TEXT,
    "customerAddress" TEXT NOT NULL,
    "customerCountry" TEXT NOT NULL,
    "customerMail" TEXT,
    "conditionReglement" TEXT NOT NULL,
    "modeReglement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "validateAd" TIMESTAMP(3) NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,
    "totalHT" DOUBLE PRECISION NOT NULL,
    "totalTTC" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceLine" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "vatRate" INTEGER NOT NULL,
    "totalHT" DOUBLE PRECISION NOT NULL,
    "totalTTC" DOUBLE PRECISION NOT NULL,
    "VatAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceLine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");

-- AddForeignKey
ALTER TABLE "InvoiceLine" ADD CONSTRAINT "InvoiceLine_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
