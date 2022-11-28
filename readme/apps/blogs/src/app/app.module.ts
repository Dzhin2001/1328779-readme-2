import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentModule } from './comment/comment.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    CommentModule,
    SubscribeModule,
    LikeModule,
    PostModule,
    BlogPostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
