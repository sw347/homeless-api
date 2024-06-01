import { Test, TestingModule } from '@nestjs/testing';
import { WorkPostController } from './work-post.controller';
import { WorkPostService } from './work-post.service';

describe('WorkPostController', () => {
  let controller: WorkPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkPostController],
      providers: [WorkPostService],
    }).compile();

    controller = module.get<WorkPostController>(WorkPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
