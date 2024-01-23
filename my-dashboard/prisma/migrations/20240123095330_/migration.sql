/*
  Warnings:

  - You are about to drop the column `pathImg` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "dueDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pathImg";
