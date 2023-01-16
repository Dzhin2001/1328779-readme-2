import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import {BlogReactionModule} from '../blog-reaction/blog-reaction.module';
import {BlogPostModule} from '../blog-post/blog-post.module';

@Module({
  imports: [
    BlogReactionModule,
    BlogPostModule,
  ],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
