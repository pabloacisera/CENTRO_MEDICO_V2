// src/upload-file/dto/upload-file.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  filename: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  clienteId: number;
}

