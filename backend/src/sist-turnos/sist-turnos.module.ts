import { Module } from '@nestjs/common';
import { SistTurnosService } from './sist-turnos.service';
import { SistTurnosController } from './sist-turnos.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [SistTurnosController],
  providers: [SistTurnosService, PrismaService],
})
export class SistTurnosModule {}
