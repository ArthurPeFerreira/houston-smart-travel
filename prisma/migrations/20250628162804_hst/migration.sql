/*
  Warnings:

  - You are about to drop the column `order` on the `Airports` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "IndexAirportsById";

-- DropIndex
DROP INDEX "IndexAirportsByOrder";

-- AlterTable
ALTER TABLE "Airports" DROP COLUMN "order";

-- CreateIndex
CREATE INDEX "IndexAirportsByAlphabeticalOrder" ON "Airports"("city");
