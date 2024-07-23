import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SistTurnosService } from './sist-turnos.service';
import { CreateSistTurnoDto } from './dto/create-sist-turno.dto';
import { UpdateSistTurnoDto } from './dto/update-sist-turno.dto';

@Controller('sist-turnos')
export class SistTurnosController {
  constructor(private readonly sistTurnosService: SistTurnosService) {}

  @Post()
  async crearTurno(@Body() data: { fecha: string, clienteId: number, userId: number }) {
    try {
      const turno = await this.sistTurnosService.crearTurno(data);
      return turno;
    } catch (error) {
      if (error.message === 'Turno no disponible') {
        throw new ConflictException({ mensaje: 'Turno no disponible', sugerencias: [] });
      } else {
        throw new InternalServerErrorException('Error al crear el turno');
      }
    }
  }

  @Get()
  async obtenerTurnos() {
    return this.sistTurnosService.obtenerTurnos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sistTurnosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSistTurnoDto: UpdateSistTurnoDto) {
    return this.sistTurnosService.update(+id, updateSistTurnoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sistTurnosService.remove(+id);
  }
}
