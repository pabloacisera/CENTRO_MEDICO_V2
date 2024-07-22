import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AutenticacionPacienteService } from './autenticacion-paciente.service';
import { CreateAutenticacionPacienteDto } from './dto/create-autenticacion-paciente.dto';
import { UpdateAutenticacionPacienteDto } from './dto/update-autenticacion-paciente.dto';

@Controller('autenticacion-paciente')
export class AutenticacionPacienteController {
  constructor(private readonly autenticacionPacienteService: AutenticacionPacienteService,
    private authService: AutenticacionPacienteService
  ) {}

  @Post('logear-paciente')
  async logearPaciente(@Body() body) {
    const { email, dni } = body;
    const user = await this.autenticacionPacienteService.validateUser(email, dni);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.autenticacionPacienteService.logearPaciente(user);
  }
}
