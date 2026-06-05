/*
  Warnings:

  - You are about to drop the column `authorName` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `authorNick` on the `Card` table. All the data in the column will be lost.
  - Made the column `authorId` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_authorId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "authorName",
DROP COLUMN "authorNick",
ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
