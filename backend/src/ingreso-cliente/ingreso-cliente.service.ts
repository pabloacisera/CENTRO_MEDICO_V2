import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';

@Injectable()
export class IngresoClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string, dni: string): Promise<{ data: any; token: string }> {
    try {
      console.log('Intento de inicio de sesión con email:', email, 'y dni:', dni);

      const cliente = await this.prisma.cliente.findUnique({
        where: {
          email,
        },
      });

      console.log('Cliente encontrado:', cliente);

      if (!cliente) {
        throw new NotFoundException('El email ingresado no es válido');
      }

      if (cliente.dni !== dni) {
        throw new NotFoundException('El DNI no es válido');
      }

      const token = jwt.sign(
        {
          nombre: cliente.nombre,
          email: cliente.email,
        },
        jwtSecret,
        { expiresIn: '1d' },
      );

      console.log('Token generado:', token);

      return { data: cliente, token };
    } catch (error) {
      console.error('Error al intentar autenticar al cliente:', error);
      throw new NotFoundException('No se pudo autenticar al cliente');
    }
  }
}