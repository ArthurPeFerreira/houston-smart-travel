/*
  Warnings:

  - A unique constraint covering the columns `[routeId,key]` on the table `CabinsRoute` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CabinsRoute_key_key";

-- CreateIndex
CREATE UNIQUE INDEX "CabinsRoute_routeId_key_key" ON "CabinsRoute"("routeId", "key");
