import { Module } from '@nestjs/common';
import {BlogReactionRepository} from './blog-reaction.repository';

@Module({
  providers: [BlogReactionRepository],
  exports: [BlogReactionRepository]
})
export class BlogReactionModule {}
