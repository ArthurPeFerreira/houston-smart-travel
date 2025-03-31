-- AlterTable
ALTER TABLE "Locals" ALTER COLUMN "active" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "hasCabinY" BOOLEAN NOT NULL,
    "hasCabinW" BOOLEAN NOT NULL,
    "hasCabinJ" BOOLEAN NOT NULL,
    "hasCabinF" BOOLEAN NOT NULL,
    "mileageProgram" TEXT NOT NULL,
    "maximumPoints" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirportsRoute" (
    "id" SERIAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,

    CONSTRAINT "AirportsRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IndexRoutesById" ON "Route"("id");

-- CreateIndex
CREATE INDEX "IndexAirportsRoute" ON "AirportsRoute"("airportId", "routeId");

-- AddForeignKey
ALTER TABLE "AirportsRoute" ADD CONSTRAINT "AirportsRoute_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirportsRoute" ADD CONSTRAINT "AirportsRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
