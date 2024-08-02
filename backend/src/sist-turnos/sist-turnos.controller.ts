import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, InternalServerErrorException, Query } from '@nestjs/common';
import { SistTurnosService } from './sist-turnos.service';
import { CreateSistTurnoDto } from './dto/create-sist-turno.dto';
import { UpdateSistTurnoDto } from './dto/update-sist-turno.dto';

@Controller('sist-turnos')
export class SistTurnosController {
  constructor(private readonly sistTurnosService: SistTurnosService) { }

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
  obtenerTurnos(@Query('userId') userId: number) {
    return this.sistTurnosService.obtenerTurnosPorUsuarioId(userId);
  }

  @Get(':userId/mis_turnos')
  async obtenerTurnosPorUserId(@Param('userId') userId: number) {
    return this.sistTurnosService.obtenerTurnosPorUsuarioId(Number(userId));
  } 

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sistTurnosService.remove(+id);
  }
}
