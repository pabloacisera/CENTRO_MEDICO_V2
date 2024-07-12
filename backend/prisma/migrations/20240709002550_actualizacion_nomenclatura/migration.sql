-- CreateTable
CREATE TABLE "Nomenclatura" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "determinacion" TEXT NOT NULL,
    "unidadBase" INTEGER NOT NULL,

    CONSTRAINT "Nomenclatura_pkey" PRIMARY KEY ("id")
);
