import { PartialType } from '@nestjs/mapped-types';
import { CreateIndicacionDto } from './create-indicacione.dto';

export class UpdateIndicacioneDto extends PartialType(CreateIndicacionDto) {}
