import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIndicacionDto } from './dto/create-indicacione.dto';
import { UpdateIndicacioneDto } from './dto/update-indicacione.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class IndicacionesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createIndicacioneDto: CreateIndicacionDto) {
    const { titulo, texto, userId } = createIndicacioneDto;
    try {
      return await this.prisma.indicacion.create({
        data: {
          titulo,
          texto,
          userId,
        },
      });
    } catch (error) {
      console.error('Error al crear la indicación en el servicio:', error);
      throw new InternalServerErrorException('Error interno al crear la indicación');
    }
  }
  

  async findAll(userId: number) {
    return await this.prisma.indicacion.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: number, id: number) {
    return await this.prisma.indicacion.findUnique({
      where: {
        id,
        userId,
      },
    });
  }

  async update(userId: number, id: number, updateIndicacioneDto: UpdateIndicacioneDto) {
    const { titulo, texto } = updateIndicacioneDto;
    return await this.prisma.indicacion.update({
      where: {
        id,
        userId,
      },
      data: {
        titulo,
        texto,
      },
    });
  }

  async remove(userId: number, id: number) {
    return await this.prisma.indicacion.delete({
      where: {
        id,
        userId,
      },
    });
  }  
}