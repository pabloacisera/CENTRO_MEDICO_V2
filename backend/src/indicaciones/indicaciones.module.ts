import { Module } from '@nestjs/common';
import { IndicacionesService } from './indicaciones.service';
import { IndicacionesController } from './indicaciones.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [IndicacionesController],
  providers: [IndicacionesService, PrismaService],
})
export class IndicacionesModule {}
