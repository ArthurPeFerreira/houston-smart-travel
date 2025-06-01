/*
  Warnings:

  - You are about to drop the column `cancellationPrice` on the `CabinsRoute` table. All the data in the column will be lost.
  - You are about to drop the column `passagePrice` on the `CabinsRoute` table. All the data in the column will be lost.
  - Added the required column `passagePriceFromAirport1To2` to the `CabinsRoute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passagePriceFromAirport2To1` to the `CabinsRoute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passagePriceRoundTrip` to the `CabinsRoute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CabinsRoute" DROP COLUMN "cancellationPrice",
DROP COLUMN "passagePrice",
ADD COLUMN     "passagePriceFromAirport1To2" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "passagePriceFromAirport2To1" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "passagePriceRoundTrip" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "RoutesData" ALTER COLUMN "seats" DROP DEFAULT;
