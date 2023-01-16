import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import {BlogReactionModule} from '../blog-reaction/blog-reaction.module';
import {BlogPostModule} from '../blog-post/blog-post.module';

@Module({
  imports: [
    BlogReactionModule,
    BlogPostModule,
  ],
  providers: [SubscribeService],
  controllers: [SubscribeController],
})
export class SubscribeModule {}
