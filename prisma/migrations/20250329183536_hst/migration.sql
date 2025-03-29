/*
  Warnings:

  - You are about to drop the column `hasCabinF` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `hasCabinJ` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `hasCabinW` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `hasCabinY` on the `Route` table. All the data in the column will be lost.
  - You are about to drop the column `maximumPoints` on the `Route` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Route" DROP COLUMN "hasCabinF",
DROP COLUMN "hasCabinJ",
DROP COLUMN "hasCabinW",
DROP COLUMN "hasCabinY",
DROP COLUMN "maximumPoints";

-- CreateTable
CREATE TABLE "CabinsRoute" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "maximumPoints" INTEGER NOT NULL,
    "passagePrice" DECIMAL(65,30) NOT NULL,
    "cancellationPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CabinsRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CabinsRoute_key_key" ON "CabinsRoute"("key");

-- CreateIndex
CREATE INDEX "IndexCabinsRoute" ON "CabinsRoute"("routeId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "CabinsRoute_routeId_key_key" ON "CabinsRoute"("routeId", "key");

-- AddForeignKey
ALTER TABLE "CabinsRoute" ADD CONSTRAINT "CabinsRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
