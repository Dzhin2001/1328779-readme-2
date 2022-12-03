import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentModule } from './comment/comment.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { BlogLikeModule } from './blog-like/blog-like.module';
import { BlogReactionModule } from './blog-reaction/blog-reaction.module';

@Module({
  imports: [
    CommentModule,
    SubscribeModule,
    LikeModule,
    PostModule,
    BlogPostModule,
    BlogCommentModule,
    BlogLikeModule,
    BlogReactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
