import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResultadoService } from './resultado.service';
import { Prisma } from '@prisma/client';

@Controller('resultado')
export class ResultadoController {
  constructor(private readonly resultadoService: ResultadoService) {}

  @Post()
  async createManyResultados(@Body() data: Prisma.ResultadoCreateManyInput[]) {
    try {
      return await this.resultadoService.createManyResults(data);
    } catch (error) {
      console.error('Error creating resultados:', error); // Log detallado
      throw new Error('Error al crear los resultados');
    }
  }

  @Get()
  findAll(@Query('clienteId') clienteId?: string) {
    return this.resultadoService.findAll(
      clienteId ? parseInt(clienteId, 10) : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultadoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResultadoDto: Prisma.ResultadoUpdateInput,
  ) {
    return this.resultadoService.update(+id, updateResultadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultadoService.remove(+id);
  }
}
