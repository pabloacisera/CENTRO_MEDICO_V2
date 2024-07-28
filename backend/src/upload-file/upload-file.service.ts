import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-service/prisma-service.service';
import { join } from 'path';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { UploadFileDto } from './dto/create-upload-file.dto';

@Injectable()
export class UploadFileService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFile(file: Express.Multer.File, clienteId: number) {
    return this.prisma.file.create({
      data: {
        filename: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        cliente: {
          connect: { id: clienteId },
        },
      },
    });
  }

  async findAllByClientId(clienteId: number) {
    return this.prisma.file.findMany({
      where: { clienteId },
    });
  }

  async downloadFile(id: number) {
    const file = await this.findOne(id);
    if (!file) {
      throw new NotFoundException(`Archivo con ID ${id} no encontrado`);
    }
    const filePath = join(process.cwd(), file.path);
    return createReadStream(filePath);
  }

  async findOne(id: number): Promise<UploadFileDto | null> {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) return null;

    return {
      id: file.id,
      filename: file.filename,
      path: file.path,
      mimeType: file.mimeType,
      size: file.size,
      createdAt: file.createdAt,
      clienteId: file.clienteId,
    };
  }

  async removeDoc(id: number) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new NotFoundException('Archivo no encontrado');
    }
    try {
      const filePath = join(process.cwd(), file.path);

      // Verificar si el archivo existe antes de intentar eliminarlo
      if (existsSync(filePath)) {
        // Remove file from disk
        unlinkSync(filePath);
      } else {
        console.warn(`El archivo ${filePath} no existe en el sistema de archivos`);
      }

      // Remove file record from database
      return await this.prisma.file.delete({
        where: { id }
      });
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      throw new InternalServerErrorException('Error al eliminar el archivo');
    }
  }
}  

