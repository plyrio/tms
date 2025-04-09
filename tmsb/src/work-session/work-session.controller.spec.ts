import { Test, TestingModule } from '@nestjs/testing';
import { WorkSessionController } from './work-session.controller';
import { WorkSessionService } from './work-session.service';

describe('WorkSessionController', () => {
  let controller: WorkSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkSessionController],
      providers: [WorkSessionService],
    }).compile();

    controller = module.get<WorkSessionController>(WorkSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
