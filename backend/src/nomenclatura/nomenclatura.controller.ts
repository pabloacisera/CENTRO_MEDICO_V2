import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NomenclaturaService } from './nomenclatura.service';

@Controller('nomenclatura')
export class NomenclaturaController {
  constructor(private readonly nomenclaturaService: NomenclaturaService) {}
  @Get()
  findAll() {
    return this.nomenclaturaService.findAll();
  }

  @Get(':codigo')
  async findByCodigo(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.nomenclaturaService.findByCodigo(codigo);
  }
}
