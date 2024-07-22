import { PartialType } from '@nestjs/mapped-types';
import { CreateAutenticacionAdministrativoDto } from './create-autenticacion-administrativo.dto';

export class UpdateAutenticacionAdministrativoDto extends PartialType(CreateAutenticacionAdministrativoDto) {}
