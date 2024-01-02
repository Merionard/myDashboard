-- DropForeignKey
ALTER TABLE "WorkPeriodLine" DROP CONSTRAINT "WorkPeriodLine_customerId_fkey";

-- DropIndex
DROP INDEX "WorkPeriodLine_customerId_key";
