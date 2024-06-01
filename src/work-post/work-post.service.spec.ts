import { Test, TestingModule } from '@nestjs/testing';
import { WorkPostService } from './work-post.service';

describe('WorkPostService', () => {
  let service: WorkPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkPostService],
    }).compile();

    service = module.get<WorkPostService>(WorkPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
