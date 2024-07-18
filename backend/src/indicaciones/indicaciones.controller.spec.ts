import { Test, TestingModule } from '@nestjs/testing';
import { IndicacionesController } from './indicaciones.controller';
import { IndicacionesService } from './indicaciones.service';

describe('IndicacionesController', () => {
  let controller: IndicacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicacionesController],
      providers: [IndicacionesService],
    }).compile();

    controller = module.get<IndicacionesController>(IndicacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
