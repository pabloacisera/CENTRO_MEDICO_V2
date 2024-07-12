import { Controller, Post, Body } from '@nestjs/common';
import { IngresoClienteService } from './ingreso-cliente.service';
import { CreateIngresoClienteDto } from './dto/create-ingreso-cliente.dto';

@Controller('ingreso-cliente')
export class IngresoClienteController {
  constructor(private readonly ingresoClienteService: IngresoClienteService) {}

  @Post()
  async login(@Body() createIngresoClienteDto: CreateIngresoClienteDto) {
    const { email, dni } = createIngresoClienteDto;
    const result = await this.ingresoClienteService.login(email, dni);
    return result;
  }
}
