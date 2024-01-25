/*
  Warnings:

  - You are about to drop the column `priority` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `Task` table. All the data in the column will be lost.
  - The primary key for the `TodoList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `theme` on the `TodoList` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listTitle` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TodoList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_theme_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "priority",
DROP COLUMN "theme",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "listTitle" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "TodoList" DROP CONSTRAINT "TodoList_pkey",
DROP COLUMN "theme",
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "TodoList_pkey" PRIMARY KEY ("title");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_listTitle_fkey" FOREIGN KEY ("listTitle") REFERENCES "TodoList"("title") ON DELETE CASCADE ON UPDATE CASCADE;
