import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll(@Body() userId: number) {
    return this.clienteService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() userId: number) {
    return this.clienteService.findOne(+id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
    @Body() userId: number,
  ) {
    return this.clienteService.update(+id, updateClienteDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() userId: number) {
    return this.clienteService.remove(+id, userId);
  }
}
