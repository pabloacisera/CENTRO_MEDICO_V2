import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { PrismaService } from 'src/prisma-service/prisma-service.service';

@Module({
  controllers: [UploadFileController],
  providers: [UploadFileService, PrismaService],
})
export class UploadFileModule {}
