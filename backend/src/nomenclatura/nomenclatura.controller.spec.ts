import { Test, TestingModule } from '@nestjs/testing';
import { NomenclaturaController } from './nomenclatura.controller';
import { NomenclaturaService } from './nomenclatura.service';

describe('NomenclaturaController', () => {
  let controller: NomenclaturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NomenclaturaController],
      providers: [NomenclaturaService],
    }).compile();

    controller = module.get<NomenclaturaController>(NomenclaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
