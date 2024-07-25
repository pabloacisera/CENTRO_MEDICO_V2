import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AutenticacionAdministrativosService } from './autenticacion-administrativos.service';
import { CreateAutenticacionAdministrativoDto } from './dto/create-autenticacion-administrativo.dto';
import { UpdateAutenticacionAdministrativoDto } from './dto/update-autenticacion-administrativo.dto';
import { reset } from 'src/usuario/dto/reset-pass';

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

  @Post('reset-password')
  async resetPassword(@Body() data: reset): Promise<{ success: boolean }> {
    try {
      const result = await this.autenticacionAdministrativosService.recuperarContraseña(data);
      return result; // Asegúrate de devolver un objeto con `success`
    } catch (error) {
      throw new InternalServerErrorException('Error al procesar la solicitud');
    }
  }

  @Patch('update-password/:id')
  async updatePassword(
    @Param('id') id: string,
    @Body('password') password: string
  ): Promise<{ success: boolean }> {
    try {
      await this.autenticacionAdministrativosService.actualizarContraseña(+id, password);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la contraseña');
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

