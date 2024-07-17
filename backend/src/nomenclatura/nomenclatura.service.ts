import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNomenclaturaDto } from './dto/create-nomenclatura.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class NomenclaturaService {
  constructor(private readonly prisma: PrismaService) {}

  
  findAll(): Promise<CreateNomenclaturaDto[]> {
    return this.prisma.nomenclatura.findMany();
  }

  async findByCodigo(codigo: number) {
    const nomenclatura = await this.prisma.nomenclatura.findFirst({
      where: { codigo },
    });
    if (!nomenclatura) {
      throw new NotFoundException('Código inexistente');
    }
    return nomenclatura;
  }
}
