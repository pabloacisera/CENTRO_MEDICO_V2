import { Controller, Post, Get, Param, Res, BadRequestException, NotFoundException, UseInterceptors, UploadedFile, Delete, InternalServerErrorException } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { UploadFileDto } from './dto/create-upload-file.dto';

@Controller('upload-file')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) { }

  @Post('/:clienteId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadFile(@Param('clienteId') clienteId: string, @UploadedFile() file: Express.Multer.File) {
    const parsedClienteId = parseInt(clienteId, 10);
    if (isNaN(parsedClienteId)) {
      throw new BadRequestException('Invalid client ID');
    }
    return this.uploadFileService.saveFile(file, parsedClienteId);
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const fileStream = await this.uploadFileService.downloadFile(+id);
    res.set({
      'Content-Disposition': `attachment; filename="archivo"`,
      'Content-Type': 'application/octet-stream',
    });
    fileStream.pipe(res);
  }

  @Get(':clienteId')
  async findAll(@Param('clienteId') clienteId: string) {
    const clienteIdNumber = Number(clienteId);
    if (isNaN(clienteIdNumber)) {
      throw new BadRequestException('El ID del cliente debe ser un número válido');
    }
    return this.uploadFileService.findAllByClientId(clienteIdNumber);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UploadFileDto> {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('ID debe ser un número válido');
    }
    const file = await this.uploadFileService.findOne(parsedId);
    if (!file) {
      throw new NotFoundException(`Archivo con ID ${parsedId} no encontrado`);
    }
    return file;
  }

  @Delete(':id')
  async removeDocs(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('ID debe ser un número válido');
    }
    try {
      const response = await this.uploadFileService.removeDoc(parsedId);
      return { message: 'Archivo eliminado correctamente', data: response };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No se encuentra archivos con el id enviado');
      }
      throw new InternalServerErrorException('Error al eliminar el archivo');
    }
  }
}

