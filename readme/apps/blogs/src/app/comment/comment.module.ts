import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import {BlogReactionModule} from '../blog-reaction/blog-reaction.module';

@Module({
  imports: [BlogReactionModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
