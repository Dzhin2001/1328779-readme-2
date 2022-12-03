import { Module } from '@nestjs/common';
import {BlogReactionMemoryRepository} from './blog-reaction-memory.repository';

@Module({
  providers: [BlogReactionMemoryRepository],
  exports: [BlogReactionMemoryRepository]
})
export class BlogReactionModule {}
