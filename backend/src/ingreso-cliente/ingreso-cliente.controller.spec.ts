import { Test, TestingModule } from '@nestjs/testing';
import { IngresoClienteController } from './ingreso-cliente.controller';
import { IngresoClienteService } from './ingreso-cliente.service';

describe('IngresoClienteController', () => {
  let controller: IngresoClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngresoClienteController],
      providers: [IngresoClienteService],
    }).compile();

    controller = module.get<IngresoClienteController>(IngresoClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
