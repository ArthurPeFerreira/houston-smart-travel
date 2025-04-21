-- DropIndex
DROP INDEX "IndexRoutesData";

-- AlterTable
ALTER TABLE "RoutesData" ADD COLUMN     "seats" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "IndexRoutesData" ON "RoutesData"("routeId", "cabinKey", "date");
