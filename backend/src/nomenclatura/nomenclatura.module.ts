import { Module } from '@nestjs/common';
import { NomenclaturaService } from './nomenclatura.service';
import { NomenclaturaController } from './nomenclatura.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [NomenclaturaController],
  providers: [NomenclaturaService, PrismaService],
})
export class NomenclaturaModule {}
