import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apply } from './entities/apply.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/entities/post.entity';
import { WorkPost } from '../work-post/entities/work-post.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ApplyDto } from './dto/apply.dto';

@Injectable()
export class ApplyService {
  constructor(
    @InjectRepository(Apply)
    private readonly applyRepository: Repository<Apply>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(WorkPost)
    private readonly workPostRepository: Repository<WorkPost>,
  ) {}

  async create(user: UserEntity, postId: string, type: 'post' | 'work-post') {
    const post =
      type == 'post'
        ? await this.postRepository.findOne({ where: { id: postId } })
        : await this.workPostRepository.findOne({ where: { uuid: postId } });
    const apply = this.applyRepository.create({
      userId: user.id,
      postId,
      type,
      createdAt: new Date(),
    });
    const applied = await this.applyRepository.save(apply);
    return {
      user: {
        name: user.name,
        isIdle: user.idleAt != null,
        idleAt: user.idleAt,
      },
      post,
      type,
      createdAt: applied.createdAt,
    };
  }

  async findByUser(userId: string, type: 'post' | 'work-post') {
    const applies = await this.applyRepository.find({
      where: { userId, type },
    });

    const postIds = applies.map((apply) => apply.postId);
    if (postIds.length == 0) {
      return [];
    }

    let actual;
    if (type == 'post') {
      actual = await this.postRepository
        .createQueryBuilder()
        .where('id IN (:...postIds)', { postIds })
        .getMany();
      return applies.map((apply) => ({
        post: actual.filter((actual: Post) => apply.postId == actual.id)[0],
        type,
        createdAt: apply.createdAt,
      }));
    } else if (type == 'work-post') {
      actual = await this.workPostRepository
        .createQueryBuilder()
        .where('id IN (:...postIds)', { postIds })
        .getMany();
      return applies.map((apply) => ({
        post: actual.filter(
          (actual: WorkPost) => apply.postId == actual.id.toString(),
        )[0],
        type,
        createdAt: apply.createdAt,
      }));
    }
  }

  async findAll(postId: string, type: 'post' | 'work-post') {
    const applies = await this.applyRepository.find({
      where: { postId, type },
      relations: ['user'],
    });

    const post =
      type == 'post'
        ? await this.postRepository.findOne({ where: { id: postId } })
        : await this.workPostRepository.findOne({ where: { uuid: postId } });

    return applies.map((apply) => ({
      user: {
        name: apply.user.name,
        isIdle: apply.user.idleAt != null,
        idleAt: apply.user.idleAt,
      },
      post: post,
      type: type,
      createdAt: apply.createdAt,
    }));
  }
}
