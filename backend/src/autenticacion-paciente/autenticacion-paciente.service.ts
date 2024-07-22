  import { Injectable } from '@nestjs/common';
  import { CreateAutenticacionPacienteDto } from './dto/create-autenticacion-paciente.dto';
  import { UpdateAutenticacionPacienteDto } from './dto/update-autenticacion-paciente.dto';
  import { JwtService } from '@nestjs/jwt';
  import { PrismaService } from 'src/prisma-service/prisma-service.service';

  @Injectable()
  export class AutenticacionPacienteService {

    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
    ) {}

    async validateUser(email: string, dni: string): Promise<any> {
      const user = await this.prisma.cliente.findUnique({
        where: { email, dni },
      });
      if (user) {
        const { dni, ...result } = user;
        return result;
      }
      return null;
    }

    async logearPaciente(user: any) {
      const payload = { email: user.email, dni: user.dni };
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
        data: user, // Incluye los datos del usuario en la respuesta
      };
    }
  }
