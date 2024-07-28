import { PartialType } from '@nestjs/mapped-types';
import { UploadFileDto } from './create-upload-file.dto';

export class UpdateUploadFileDto extends PartialType(UploadFileDto) {}
