import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { User } from "../user/entities/user.entity";
import { JwtGuard } from "../auth/jwt.guard";
import { PostService } from "../post/post.service";

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService, private readonly postService: PostService) {}

  @Post(':id')
  async create(@Req() req: {body: CreateApplyDto, user: User}, @Param('id') postId: string) {
    const post = await this.postService.findOne(postId);
    return this.applyService.create(req.body, req.user, post);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') postId: string, @Req() req: {user: User}) {
    const post = await this.postService.findOne(postId);
    return this.applyService.remove(post, req.user);
  }
}
