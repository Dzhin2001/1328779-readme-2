import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { CommentModule } from './comment/comment.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { LikeModule } from './like/like.module';
import { PostModule } from './post/post.module';
import { BlogReactionModule } from './blog-reaction/blog-reaction.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BLOGS_ENV_FILE_PATH } from './app.constant';

@Module({
  imports: [
    PrismaModule,
    CommentModule,
    SubscribeModule,
    LikeModule,
    PostModule,
    BlogPostModule,
    BlogReactionModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: BLOGS_ENV_FILE_PATH
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
