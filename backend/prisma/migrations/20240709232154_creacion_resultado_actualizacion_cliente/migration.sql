-- CreateTable
CREATE TABLE "Resultado" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "determinacion" TEXT NOT NULL,
    "unidadBase" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
