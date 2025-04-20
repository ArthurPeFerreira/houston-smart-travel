/*
  Warnings:

  - Added the required column `destinationAirport` to the `RoutesData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originAirport` to the `RoutesData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoutesData" ADD COLUMN     "destinationAirport" TEXT NOT NULL,
ADD COLUMN     "originAirport" TEXT NOT NULL;
