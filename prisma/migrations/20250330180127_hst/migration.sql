/*
  Warnings:

  - Added the required column `bagsAmount` to the `CabinsRoute` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "IndexAirportsRoute";

-- AlterTable
ALTER TABLE "CabinsRoute" ADD COLUMN     "bagsAmount" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "IndexAirportsRoute" ON "AirportsRoute"("routeId", "airportId");
