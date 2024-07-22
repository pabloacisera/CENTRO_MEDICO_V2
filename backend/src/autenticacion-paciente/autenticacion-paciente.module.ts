import { Module } from '@nestjs/common';
import { AutenticacionPacienteService } from './autenticacion-paciente.service';
import { AutenticacionPacienteController } from './autenticacion-paciente.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  imports: [ 
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutenticacionPacienteController],
  providers: [AutenticacionPacienteService, JwtStrategy, PrismaService],
})
export class AutenticacionPacienteModule {}
