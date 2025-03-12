/*
  Warnings:

  - You are about to drop the column `name` on the `Locals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[airportId]` on the table `Locals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `airportId` to the `Locals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Locals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Locals" DROP COLUMN "name",
ADD COLUMN     "airportId" INTEGER NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Locals_airportId_key" ON "Locals"("airportId");

-- AddForeignKey
ALTER TABLE "Locals" ADD CONSTRAINT "Locals_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airports"("id") ON DELETE CASCADE ON UPDATE CASCADE;
