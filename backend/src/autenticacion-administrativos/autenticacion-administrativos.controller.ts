import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AutenticacionAdministrativosService } from './autenticacion-administrativos.service';
import { CreateAutenticacionAdministrativoDto } from './dto/create-autenticacion-administrativo.dto';
import { UpdateAutenticacionAdministrativoDto } from './dto/update-autenticacion-administrativo.dto';

@Controller('autenticacion-administrativos')
export class AutenticacionAdministrativosController {
  constructor(private readonly autenticacionAdministrativosService: AutenticacionAdministrativosService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const usuario = await this.autenticacionAdministrativosService.authenticate(body.email, body.password);
      return usuario; // Devolver el usuario autenticado
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Post()
  create(@Body() createAutenticacionAdministrativoDto: CreateAutenticacionAdministrativoDto) {
    return this.autenticacionAdministrativosService.create(createAutenticacionAdministrativoDto);
  }

  @Get()
  findAll() {
    return this.autenticacionAdministrativosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autenticacionAdministrativosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutenticacionAdministrativoDto: UpdateAutenticacionAdministrativoDto) {
    return this.autenticacionAdministrativosService.update(+id, updateAutenticacionAdministrativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autenticacionAdministrativosService.remove(+id);
  }
}

