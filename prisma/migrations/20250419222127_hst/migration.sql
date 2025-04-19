-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

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
    "airportId" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "passagePrice" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Locals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "mileageProgram" TEXT NOT NULL,
    "enableLayovers" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CabinsRoute" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "maximumPoints" INTEGER NOT NULL,
    "bagsAmount" INTEGER NOT NULL,
    "passagePrice" DECIMAL(65,30) NOT NULL,
    "cancellationPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "CabinsRoute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirportsRoute" (
    "id" SERIAL NOT NULL,
    "airportId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,

    CONSTRAINT "AirportsRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_key" ON "Users"("user");

-- CreateIndex
CREATE INDEX "IndexUserById" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_airportCode_key" ON "Airports"("airportCode");

-- CreateIndex
CREATE INDEX "IndexAirportsById" ON "Airports"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Locals_airportId_key" ON "Locals"("airportId");

-- CreateIndex
CREATE INDEX "IndexLocalsById" ON "Locals"("id");

-- CreateIndex
CREATE INDEX "IndexRoutesById" ON "Route"("id");

-- CreateIndex
CREATE INDEX "IndexCabinsRoute" ON "CabinsRoute"("routeId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "CabinsRoute_routeId_key_key" ON "CabinsRoute"("routeId", "key");

-- CreateIndex
CREATE INDEX "IndexAirportsRoute" ON "AirportsRoute"("routeId", "airportId");

-- AddForeignKey
ALTER TABLE "Locals" ADD CONSTRAINT "Locals_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CabinsRoute" ADD CONSTRAINT "CabinsRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirportsRoute" ADD CONSTRAINT "AirportsRoute_airportId_fkey" FOREIGN KEY ("airportId") REFERENCES "Airports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirportsRoute" ADD CONSTRAINT "AirportsRoute_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
