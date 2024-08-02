/*
  Warnings:

  - You are about to drop the `Turno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Turno" DROP CONSTRAINT "Turno_userId_fkey";

-- DropTable
DROP TABLE "Turno";

-- CreateTable
CREATE TABLE "turnos" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "turnos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "turnos" ADD CONSTRAINT "turnos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turnos" ADD CONSTRAINT "turnos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
