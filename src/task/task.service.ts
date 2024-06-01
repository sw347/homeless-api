import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coop } from '../coop/entities/coop.entity';
import { Repository } from 'typeorm';
import { WorkPost } from '../work-post/entities/work-post.entity';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { WorkPostDto } from '../work-post/dto/work-post.dto';
import { CoopDto } from '../coop/dto/coop.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Coop) private coopRepository: Repository<Coop>,
    @InjectRepository(WorkPost)
    private workPostRepository: Repository<WorkPost>,
    private readonly httpService: HttpService,
  ) {}

  @Cron('0 30 18 * * *')
  async everyCoop() {
    const { data } = await this.getCoopAll();
    data.forEach((coop) => {});
  }

  @Cron('0 30 18 * * *')
  async everyWorkPost() {
    const { data } = await this.getWorkPostPublic();
    data.forEach((workPost) => {});
  }

  getCoopAll() {
    return this.httpService.axiosRef.get<CoopDto[]>(
      'https://222.110.147.50:8725/coop/all',
    );
  }

  getWorkPostPublic() {
    return this.httpService.axiosRef.get<WorkPostDto[]>(
      'https://222.110.147.50:8725/work/public',
    );
  }
}
