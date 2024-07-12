import { PartialType } from '@nestjs/mapped-types';
import { CreateNomenclaturaDto } from './create-nomenclatura.dto';

export class UpdateNomenclaturaDto extends PartialType(CreateNomenclaturaDto) {}
