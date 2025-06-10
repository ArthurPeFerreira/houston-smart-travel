-- CreateTable
CREATE TABLE "AccessCounter" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "lastAccessAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessCounter_pkey" PRIMARY KEY ("id")
);
