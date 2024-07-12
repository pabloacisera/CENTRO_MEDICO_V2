import { Module } from '@nestjs/common';
import { ResultadoService } from './resultado.service';
import { ResultadoController } from './resultado.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [ResultadoController],
  providers: [ResultadoService, PrismaService],
})
export class ResultadoModule {}
