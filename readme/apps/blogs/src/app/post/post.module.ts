import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import {BlogPostModule} from '../blog-post/blog-post.module';

@Module({
  imports: [BlogPostModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
