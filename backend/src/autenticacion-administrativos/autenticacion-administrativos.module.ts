import { Module } from '@nestjs/common';
import { AutenticacionAdministrativosService } from './autenticacion-administrativos.service';
import { AutenticacionAdministrativosController } from './autenticacion-administrativos.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [AutenticacionAdministrativosController],
  providers: [AutenticacionAdministrativosService, PrismaService],
})
export class AutenticacionAdministrativosModule {}
