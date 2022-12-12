import { Module } from '@nestjs/common';
import {BlogPostRepository} from './blog-post.repository';

@Module({
  providers: [BlogPostRepository],
  exports: [BlogPostRepository]
})
export class BlogPostModule {}
