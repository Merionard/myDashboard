/*
  Warnings:

  - You are about to drop the column `todoListId` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `TodoList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `theme` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_todoListId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "todoListId",
ADD COLUMN     "theme" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TodoList_pkey" PRIMARY KEY ("theme");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_theme_fkey" FOREIGN KEY ("theme") REFERENCES "TodoList"("theme") ON DELETE CASCADE ON UPDATE CASCADE;
