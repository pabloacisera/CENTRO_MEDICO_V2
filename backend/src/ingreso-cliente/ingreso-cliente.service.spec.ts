import { Test, TestingModule } from '@nestjs/testing';
import { IngresoClienteService } from './ingreso-cliente.service';

describe('IngresoClienteService', () => {
  let service: IngresoClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngresoClienteService],
    }).compile();

    service = module.get<IngresoClienteService>(IngresoClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
