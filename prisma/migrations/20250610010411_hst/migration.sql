/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `AccessCounter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AccessCounter_type_key" ON "AccessCounter"("type");
