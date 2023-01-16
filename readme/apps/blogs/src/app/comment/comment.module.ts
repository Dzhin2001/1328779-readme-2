import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import {BlogReactionModule} from '../blog-reaction/blog-reaction.module';
import {BlogPostModule} from '../blog-post/blog-post.module';

@Module({
  imports: [
    BlogReactionModule,
    BlogPostModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
