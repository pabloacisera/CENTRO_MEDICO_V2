/*
  Warnings:

  - Added the required column `resultado` to the `Resultado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resultado" ADD COLUMN     "resultado" DOUBLE PRECISION NOT NULL;
