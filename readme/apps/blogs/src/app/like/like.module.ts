import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import {BlogReactionModule} from '../blog-reaction/blog-reaction.module';

@Module({
  imports: [BlogReactionModule],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
