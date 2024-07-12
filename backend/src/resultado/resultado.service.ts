import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { Prisma, Resultado } from '@prisma/client';

@Injectable()
export class ResultadoService {
  constructor(private prisma: PrismaService) {}

  async createManyResults(
    data: Prisma.ResultadoCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma.resultado.createMany({
        data,
        skipDuplicates: true,
      });
    } catch (error) {
      // Handle error appropriately, e.g., log or re-throw
      throw new Error(`Error creating resultados: ${error.message}`);
    }
  }

  async findAll(clienteId?: number): Promise<Resultado[]> {
    try {
      const where: Prisma.ResultadoWhereInput = clienteId ? { clienteId } : {};
      return await this.prisma.resultado.findMany({ where });
    } catch (error) {
      console.error('Error fetching all resultados:', error);
      throw new Error(
        `Error al obtener todos los resultados: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Resultado | null> {
    try {
      const resultado = await this.prisma.resultado.findUnique({
        where: { id },
      });
      if (!resultado) {
        throw new NotFoundException(`Resultado with ID ${id} not found.`);
      }
      return resultado;
    } catch (error) {
      console.error(`Error fetching resultado with ID ${id}:`, error);
      throw new Error(`Error al obtener el resultado: ${error.message}`);
    }
  }

  async update(
    id: number,
    updateResultadoDto: Prisma.ResultadoUpdateInput,
  ): Promise<Resultado> {
    try {
      const resultado = await this.prisma.resultado.update({
        where: { id },
        data: updateResultadoDto,
      });
      if (!resultado) {
        throw new NotFoundException(`Resultado with ID ${id} not found.`);
      }
      return resultado;
    } catch (error) {
      console.error(`Error updating resultado with ID ${id}:`, error);
      throw new Error(`Error al actualizar el resultado: ${error.message}`);
    }
  }

  async remove(id: number): Promise<Resultado> {
    try {
      const resultado = await this.prisma.resultado.delete({ where: { id } });
      if (!resultado) {
        throw new NotFoundException(`Resultado with ID ${id} not found.`);
      }
      return resultado;
    } catch (error) {
      console.error(`Error deleting resultado with ID ${id}:`, error);
      throw new Error(`Error al eliminar el resultado: ${error.message}`);
    }
  }
}
