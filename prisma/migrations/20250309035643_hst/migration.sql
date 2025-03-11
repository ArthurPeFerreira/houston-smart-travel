-- CreateTable
CREATE TABLE "Airports" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "airportCode" TEXT NOT NULL,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "Locals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airports_airportCode_key" ON "Airports"("airportCode");

-- CreateIndex
CREATE INDEX "IndexAirportsById" ON "Airports"("id" ASC);

-- CreateIndex
CREATE INDEX "IndexLocalsById" ON "Locals"("id" ASC);
