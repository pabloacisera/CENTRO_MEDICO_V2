import { Module } from '@nestjs/common';
import { IngresoClienteService } from './ingreso-cliente.service';
import { IngresoClienteController } from './ingreso-cliente.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [IngresoClienteController],
  providers: [IngresoClienteService, PrismaService],
})
export class IngresoClienteModule {}
