import { PartialType } from '@nestjs/mapped-types';
import { CreateAutenticacionPacienteDto } from './create-autenticacion-paciente.dto';

export class UpdateAutenticacionPacienteDto extends PartialType(CreateAutenticacionPacienteDto) {}
