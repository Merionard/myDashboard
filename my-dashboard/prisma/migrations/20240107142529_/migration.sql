/*
  Warnings:

  - You are about to alter the column `duration` on the `WorkDay` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- DropForeignKey
ALTER TABLE "WorkDay" DROP CONSTRAINT "WorkDay_workPeriodLineId_fkey";

-- AlterTable
ALTER TABLE "WorkDay" ALTER COLUMN "duration" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_workPeriodLineId_fkey" FOREIGN KEY ("workPeriodLineId") REFERENCES "WorkPeriodLine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
