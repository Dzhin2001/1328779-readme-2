import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import {BlogReactionModule} from '../blog-reaction/blog-reaction.module';
import {BlogPostModule} from '../blog-post/blog-post.module';
import {BlogSubscribeRepository} from './blog-subscribe.repository';

@Module({
  imports: [
    BlogReactionModule,
    BlogPostModule,
  ],
  providers: [
    BlogSubscribeRepository,
    SubscribeService
  ],
  controllers: [SubscribeController],
  exports: [BlogSubscribeRepository],
})
export class SubscribeModule {}
