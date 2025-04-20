-- CreateTable
CREATE TABLE "RoutesData" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "cabinKey" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "direct" BOOLEAN NOT NULL,

    CONSTRAINT "RoutesData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "IndexRoutesData" ON "RoutesData"("routeId", "cabinKey");

-- AddForeignKey
ALTER TABLE "RoutesData" ADD CONSTRAINT "RoutesData_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE CASCADE ON UPDATE CASCADE;
