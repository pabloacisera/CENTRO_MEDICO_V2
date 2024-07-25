import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaService } from './prisma-service/prisma-service.service';
import { ClienteModule } from './cliente/cliente.module';
import { NomenclaturaModule } from './nomenclatura/nomenclatura.module';
import { ResultadoModule } from './resultado/resultado.module';
import { IndicacionesModule } from './indicaciones/indicaciones.module';
import { AutenticacionPacienteModule } from './autenticacion-paciente/autenticacion-paciente.module';
import { AutenticacionAdministrativosModule } from './autenticacion-administrativos/autenticacion-administrativos.module';
import { SistTurnosModule } from './sist-turnos/sist-turnos.module';
import { NotificacionesGateway } from './cliente/notificaciones.gateway';
import { ConfigModule } from '@nestjs/config';
import { CorreosModule } from "./correos-backend/correos.module";

@Module({
  imports: [UsuarioModule, ClienteModule, NomenclaturaModule, ResultadoModule, IndicacionesModule, AutenticacionPacienteModule, AutenticacionAdministrativosModule, SistTurnosModule, CorreosModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el módulo esté disponible en toda la aplicación
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, NotificacionesGateway],
})
export class AppModule {}
