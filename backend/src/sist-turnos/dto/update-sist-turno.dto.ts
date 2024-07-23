import { PartialType } from '@nestjs/mapped-types';
import { CreateSistTurnoDto } from './create-sist-turno.dto';

export class UpdateSistTurnoDto extends PartialType(CreateSistTurnoDto) {}
