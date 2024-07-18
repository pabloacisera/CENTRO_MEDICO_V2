import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, InternalServerErrorException, HttpStatus, HttpException } from '@nestjs/common';
import { IndicacionesService } from './indicaciones.service';
import { CreateIndicacionDto } from './dto/create-indicacione.dto';
import { UpdateIndicacioneDto } from './dto/update-indicacione.dto';

@Controller('indicaciones')
export class IndicacionesController {
  constructor(private readonly indicacionesService: IndicacionesService) { }

  @Post()
  async create(@Body() createIndicacioneDto: CreateIndicacionDto) {
    try {
      const indicacionCreada = await this.indicacionesService.create(createIndicacioneDto);
      return indicacionCreada;  // Esto devuelve la indicación creada
    } catch (error) {
      console.error('Error al crear la indicación:', error);
      throw new InternalServerErrorException('Error interno al crear la indicación');
    }
  }

  @Get(':userId')
  findAll(@Param('userId', ParseIntPipe) userId: number) {
    return this.indicacionesService.findAll(userId);
  }

  @Get(':userId/:id')
  findOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.indicacionesService.findOne(userId, id);
  }

  @Patch(':userId/:id')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateIndicacioneDto: UpdateIndicacioneDto,
  ) {
    return this.indicacionesService.update(userId, id, updateIndicacioneDto);
  }

  @Delete(':userId/:id')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      await this.indicacionesService.remove(userId, id);
      return { message: `Indicación con ID ${id} eliminada correctamente.` };
    } catch (error) {
      console.error('Error al eliminar la indicación:', error);
      throw new HttpException(
        'Error al eliminar la indicación',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
