import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { AnyAaaaRecord, AnyRecord } from 'dns';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createClienteDto: CreateClienteDto) {
    try {
      const lastCliente = await this.prisma.cliente.findFirst({
        where: { userId: createClienteDto.userId },
        orderBy: { protocolo: 'desc' },
      });

      const protocolo = lastCliente ? lastCliente.protocolo + 1 : createClienteDto.protocolo;

      // Asegúrate de que el número de protocolo sea único
      const cliente = await this.prisma.cliente.create({
        data: {
          protocolo,
          nombre: createClienteDto.nombre,
          dni: createClienteDto.dni.toString(),
          nacimiento: new Date(createClienteDto.nacimiento),
          edad: createClienteDto.edad,
          direccion: createClienteDto.direccion,
          localidad: createClienteDto.localidad,
          telefono: createClienteDto.telefono,
          email: createClienteDto.email,
          seguridadSocial: createClienteDto.seguridadSocial,
          obs: createClienteDto.obs,
          userId: createClienteDto.userId,
        },
      });

      return cliente;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error al crear cliente');
    }
  }

  async findAll(userId: number) {
    return this.prisma.cliente.findMany({
      where: { userId },
    });
  }

  async findAllformAdmin() {
    return this.prisma.cliente.findMany()
  }

  async getClientsByIds(ids: number[]): Promise<any[]> {
    return this.prisma.cliente.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async encontrarClienteById(id: number) {
    return this.prisma.cliente.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto, userId: number) {
    try {
      return this.prisma.cliente.update({
        where: { id, userId },
        data: {
          nombre: updateClienteDto.nombre,
          dni: updateClienteDto.dni.toString(),
          nacimiento: new Date(updateClienteDto.nacimiento),
          edad: updateClienteDto.edad,
          direccion: updateClienteDto.direccion,
          localidad: updateClienteDto.localidad,
          telefono: updateClienteDto.telefono,
          email: updateClienteDto.email,
          seguridadSocial: updateClienteDto.seguridadSocial,
          obs: updateClienteDto.obs,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error al actualizar cliente');
    }
  }

  async remove(id: number, userId: number) {
    try {
      return this.prisma.cliente.delete({
        where: { id, userId },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error al eliminar cliente');
    }
  }
}
