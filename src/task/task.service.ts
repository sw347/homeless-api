import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coop } from '../coop/entities/coop.entity';
import { Repository } from 'typeorm';
import { WorkPost } from '../work-post/entities/work-post.entity';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { WorkPostDto } from '../work-post/dto/work-post.dto';
import { Org } from '../org/entities/org.entity';
import { CrawlerOrgDto } from '../org/dto/crawler.org.dto';
import { CrawlerCoopDto } from '../coop/dto/crawler.coop.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Coop)
    private readonly coopRepository: Repository<Coop>,
    @InjectRepository(Org)
    private readonly orgRepository: Repository<Org>,
    @InjectRepository(WorkPost)
    private readonly workPostRepository: Repository<WorkPost>,
  ) {}

  @Cron('0 40 18 * * *')
  async everyCoop(stop?: boolean): Promise<void> {
    console.log('coop save start');
    const coops = await this.getCoopList();
    const { data, status } = coops;
    console.log(data, status);
    if (status > 302 && !stop) {
      console.log('not saved!!');
      return await this.everyCoop(true);
    }
    const createdAt = new Date();
    await this.coopRepository.save(
      data.map((val) => {
        const { realLocation, ...other } = val;
        if (realLocation == null) return { ...other, createdAt };
        return {
          lat: realLocation.lat,
          lng: realLocation.lng,
          ...other,
          createdAt,
        };
      }),
    );
    console.log('coop saved');
  }

  @Cron('0 50 18 * * *')
  async everyOrg(stop?: boolean): Promise<void> {
    console.log('org save start');
    const orgs = await this.getOrgAll();
    const { data, status } = orgs;
    console.log(data, status);
    if (status > 302 && !stop) {
      console.log('org not saved!!');
      return await this.everyOrg(true);
    }
    const createdAt = new Date();
    await this.orgRepository.save(
      data.map((val) => {
        const { realLocation, ...other } = val;
        if (realLocation == null) return { ...other, createdAt };
        return {
          lat: realLocation.lat,
          lng: realLocation.lng,
          ...other,
          createdAt,
        };
      }),
    );
    console.log('org saved');
  }

  @Cron('0 30 18 * * *')
  async everyWorkPost(stop?: boolean): Promise<void> {
    console.log('work-post save start');
    const work_posts = await this.getWorkPostPublic();
    const { data, status } = work_posts;
    console.log(data, status);
    if (status > 302 && !stop) {
      console.log('work-post not saved!!');
      return await this.everyWorkPost(true);
    }
    const createdAt = new Date();
    await this.workPostRepository.save(
      data.map((val) => ({ ...val, createdAt })),
    );
    console.log('work-post saved');
  }

  getOrgAll() {
    return this.httpService.axiosRef.get<CrawlerOrgDto[]>(
      'http://222.110.147.50:8725/coop/all',
    );
  }

  getCoopList() {
    return this.httpService.axiosRef.get<CrawlerCoopDto[]>(
      'http://222.110.147.50:8725/coop/list',
    );
  }

  getWorkPostPublic() {
    return this.httpService.axiosRef.get<WorkPostDto[]>(
      'http://222.110.147.50:8725/work/public',
    );
  }
}
