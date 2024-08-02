import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSistTurnoDto } from './dto/create-sist-turno.dto';
import { UpdateSistTurnoDto } from './dto/update-sist-turno.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class SistTurnosService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async crearTurno(data: { fecha: string, clienteId: number, userId: number }) {
    const fecha = new Date(data.fecha);
    const turnoExistente = await this.prisma.turno.findFirst({ where: { fecha } });

    if (turnoExistente) {
      throw new ConflictException('Turno no disponible');
    }

    try {
      return await this.prisma.turno.create({
        data: {
          fecha,
          clienteId: data.clienteId,
          userId: data.userId,
        },
      });
    } catch (error) {
      console.error('Error al crear el turno:', error);
      throw new Error('Error al crear el turno');
    }

    const turnoAnterior = await this.prisma.turno.findFirst({
      where: { fecha: new Date(fecha.getTime() - 30 * 60000) }
    });

    const turnoPosterior = await this.prisma.turno.findFirst({
      where: { fecha: new Date(fecha.getTime() + 30 * 60000) },
    });

    const sugerencias = [];
    if (!turnoAnterior) {
      sugerencias.push(new Date(fecha.getTime() - 30 * 60000));
    }
    if (!turnoPosterior) {
      sugerencias.push(new Date(fecha.getTime() + 30 * 60000));
    }

    if (sugerencias.length > 0) {
      return { mensaje: 'Turno no disponible', sugerencias };
    }

    return this.prisma.turno.create({
      data: { fecha, clienteId: data.clienteId, userId: data.userId }
    });
  }



  async obtenerTurnos() {
    return this.prisma.turno.findMany({
      include: {
        Cliente: true,
        Usuario: true,
      },
    });
  }

  async obtenerTurnosPorUsuarioId(userId: number) {
    try {
      return await this.prisma.turno.findMany({
        where: { userId: userId },
      });
    } catch (error) {
      console.error('Error al obtener los turnos:', error);
      throw new InternalServerErrorException('No se ha podido obtener los turnos');
    }
  }  
  
  remove(id: number) {
    return this.prisma.turno.delete({
      where: {
        id: id
      }
    })
  }
}
