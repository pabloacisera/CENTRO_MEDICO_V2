import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1d' }, // Puedes ajustar esto según tus necesidades
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService],
  exports: [UsuarioService], // Si quieres exportar el servicio para usarlo en otros módulos
})
export class UsuarioModule {}

