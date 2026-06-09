/*
  Warnings:

  - Changed the type of `historicalPeriod` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "HistoricalPeriod" AS ENUM ('ANCIENT', 'MIDDLE_AGES', 'NAPOLEONIC_WARS', 'WORLD_WAR_1', 'WORLD_WAR_2', 'FANTASY', 'OTHER');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "historicalPeriod",
ADD COLUMN     "historicalPeriod" "HistoricalPeriod" NOT NULL;
