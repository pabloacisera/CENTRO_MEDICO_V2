import { Injectable } from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Injectable()
export class UploadFileService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async saveFile(file: Express.Multer.File, clienteId: number) {
    return this.prisma.file.create({
      data: {
        filename: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        cliente: {
          connect: {
            id: clienteId,
          },
        },
      },
    });
  }

  findAll() {
    return `This action returns all uploadFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploadFile`;
  }

  update(id: number, updateUploadFileDto: UpdateUploadFileDto) {
    return `This action updates a #${id} uploadFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploadFile`;
  }
}
