import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './prisma-service/prisma-service.service';
import { ClienteModule } from './cliente/cliente.module';
import { NomenclaturaModule } from './nomenclatura/nomenclatura.module';
import { ResultadoModule } from './resultado/resultado.module';
import { IngresoClienteModule } from './ingreso-cliente/ingreso-cliente.module';
import { IndicacionesModule } from './indicaciones/indicaciones.module';

@Module({
  imports: [UsuarioModule, ClienteModule, NomenclaturaModule, ResultadoModule, IngresoClienteModule, IndicacionesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
