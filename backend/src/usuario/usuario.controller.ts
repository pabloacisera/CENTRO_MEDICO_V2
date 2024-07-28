import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Login, LoginAdmin } from './dto/login-usuario.dto';
import { get } from 'http';
import { reset } from './dto/reset-pass';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Post('autenticacion')
  logear(@Body() dtoLogeo: Login) {
    return this.usuarioService.login(dtoLogeo);
  }

  @Post('auth-admin')
  logearAdmin(@Body() dtoLogeo: Login) {
    return this.usuarioService.loginAdministrativos(dtoLogeo);
  }

  @Post('reset-password')
  async resetPassword(@Body() data: reset): Promise<{ success: boolean }> {
    try {
      const result = await this.usuarioService.recuperarContraseña(data);
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
      await this.usuarioService.actualizarContraseña(+id, password);
      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la contraseña');
    }
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('/agend/:id')
  findAllExcept(@Param('id') userId: number) {
    return this.usuarioService.findAllExcept(Number(userId));
  }

  @Get('forAdmin')
  findAllForAdmin() {
    return this.usuarioService.FindAllForAdmin()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
