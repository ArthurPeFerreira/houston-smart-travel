/*
  Warnings:

  - Added the required column `type` to the `AccessCounter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessCounter" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Airports" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "IndexAirportsByOrder" ON "Airports"("order");
