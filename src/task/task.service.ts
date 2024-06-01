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

  @Cron('30 31 2 * * *')
  async everyCoop(): Promise<void> {
    console.log('coop save start');
    const coops = await this.getCoopAll();
    const { data, status } = coops;
    console.log(data, status);
    if (status > 302) {
      console.log('not saved!!');
      return await this.everyCoop();
    }
    await this.coopRepository.save(
      data.map((val) => {
        const { realLocation, ...other } = val;
        if (realLocation == null) return other;
        return {
          lat: realLocation.lat,
          lng: realLocation.lat,
          ...other,
        };
      }),
    );
    console.log('coop saved');
  }

  @Cron('40 29 2 * * *')
  async everyWorkPost(): Promise<void> {
    console.log('work-post save start');
    const work_posts = await this.getWorkPostPublic();
    const { data, status } = work_posts;
    console.log(data, status);
    if (status > 302) {
      console.log('work-post not saved!!');
      return await this.everyWorkPost();
    }
    await this.workPostRepository.save(data);
    console.log('work-post saved');
  }

  getCoopAll() {
    return this.httpService.axiosRef.get<CoopDto[]>(
      'http://222.110.147.50:8725/coop/all',
    );
  }

  getWorkPostPublic() {
    return this.httpService.axiosRef.get<WorkPostDto[]>(
      'http://222.110.147.50:8725/work/public',
    );
  }
}
