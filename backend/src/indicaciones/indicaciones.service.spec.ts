import { Test, TestingModule } from '@nestjs/testing';
import { IndicacionesService } from './indicaciones.service';

describe('IndicacionesService', () => {
  let service: IndicacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicacionesService],
    }).compile();

    service = module.get<IndicacionesService>(IndicacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
