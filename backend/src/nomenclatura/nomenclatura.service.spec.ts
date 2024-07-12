import { Test, TestingModule } from '@nestjs/testing';
import { NomenclaturaService } from './nomenclatura.service';

describe('NomenclaturaService', () => {
  let service: NomenclaturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NomenclaturaService],
    }).compile();

    service = module.get<NomenclaturaService>(NomenclaturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
