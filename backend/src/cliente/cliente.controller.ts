import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Request, Response } from 'express';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService,
  ) { }

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll(@Query('userId') userId: number) {
    return this.clienteService.findAll(Number(userId));
  }

  @Get(':id')
  async encontrarClienteById(@Param('id') id: string) {
    const idNumber = +id; // o parseInt(id, 10)
    return this.clienteService.encontrarClienteById(idNumber);
  }

  @Get('forAdmin')
  findAllForAdmin() {
    return this.clienteService.findAllformAdmin()
  }

  @Post('find-by-ids')
  async getClientsByIds(@Body('ids') ids: number[]) {
    return this.clienteService.getClientsByIds(ids);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClienteDto: UpdateClienteDto,
    @Query('userId') userId: number,
  ) {
    return this.clienteService.update(+id, updateClienteDto, Number(userId));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query('userId') userId: number) {
    return this.clienteService.remove(+id, Number(userId));
  }
}