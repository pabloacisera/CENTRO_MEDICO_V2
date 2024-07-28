import { PartialType } from '@nestjs/swagger';
import { CreateImapflowCorreoDto } from './create-imapflow-correo.dto';

export class UpdateImapflowCorreoDto extends PartialType(CreateImapflowCorreoDto) {}
