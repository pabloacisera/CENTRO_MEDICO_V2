-- CreateTable
CREATE TABLE "Indicacion" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Indicacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Indicacion_userId_idx" ON "Indicacion"("userId");

-- AddForeignKey
ALTER TABLE "Indicacion" ADD CONSTRAINT "Indicacion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
