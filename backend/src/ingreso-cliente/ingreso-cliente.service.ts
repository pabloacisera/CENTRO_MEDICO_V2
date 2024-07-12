import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

@Injectable()
export class IngresoClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async login(
    email: string,
    dni: string,
  ): Promise<{ data: any; token: string }> {
    try {
      // Buscar el cliente por email
      const cliente = await this.prisma.cliente.findUnique({
        where: {
          email,
        },
      });

      if (!cliente) {
        throw new NotFoundException('El email ingresado no es válido');
      }

      // Verificar que el DNI coincida
      if (cliente.dni !== dni) {
        throw new NotFoundException('El DNI no es válido');
      }

      // Generar y retornar el token JWT
      const token = jwt.sign(
        {
          nombre: cliente.nombre,
          email: cliente.email,
          // Incluir más datos del cliente si es necesario
        },
        jwtSecret,
        { expiresIn: '1d' },
      );

      return { data: cliente, token };
    } catch (error) {
      throw new NotFoundException('No se pudo autenticar al cliente');
    }
  }
}
