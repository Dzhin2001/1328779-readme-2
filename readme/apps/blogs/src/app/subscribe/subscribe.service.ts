import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateSubscribeDto} from './dto/create-subscribe.dto';
import {Post, Subscribe} from '@readme/shared-types';
import {BlogPostRepository} from '../blog-post/blog-post.repository';
import {SubscribeValidationMessage} from './subscribe.constant';
import {SubscribeQuery} from './query/subscribe.query';
import {BlogSubscribeRepository} from './blog-subscribe.repository';
import {PostQuery} from "../post/query/post.query";

@Injectable()
export class SubscribeService {
  constructor(
    private readonly blogSubscribeRepository: BlogSubscribeRepository,
    private readonly blogReactionRepository: BlogReactionRepository,
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getSubscribe(id: number): Promise<Subscribe | null> {
    return await this.blogSubscribeRepository.findById(id);
  }

  async getSubscribes(query: SubscribeQuery): Promise<Post[]> {
    return await this.blogSubscribeRepository.find(query);
  }

  async getPostBySubscribe(query: SubscribeQuery): Promise<Post[]> {
    if (!query.userId) {
      throw new HttpException(SubscribeValidationMessage.SubscribeUserDefineError, HttpStatus.FORBIDDEN);
    };
    const subscribes = await this.blogSubscribeRepository.find(query);
    const authors = [
      query.userId,
      ...Array.from(subscribes.map((item) => item.author))
        .filter((item) => item !== query.userId)
    ];
    const queryPost = new PostQuery;
    queryPost.authors = authors;
    queryPost.limit = query.limit;
    queryPost.sortDirection = query.sortDirection;
    queryPost.page = query.page;
    return await this.blogPostRepository.find(queryPost);
  }

  async createSubscribe(dto: CreateSubscribeDto ): Promise<Subscribe | null> {
    const {author} = dto;
    const query = new SubscribeQuery;
    query.author = author;
    const subscribes = await this.blogSubscribeRepository.find(query);
    if (subscribes.length > 0) {
      throw new HttpException(SubscribeValidationMessage.SubscribeAlreadyExists, HttpStatus.FORBIDDEN);
    }
    const subscribeEntity = new BlogReactionEntity(dto);
    return await this.blogSubscribeRepository.create(subscribeEntity);
  }

  async deleteSubscribe(id: number, userId: string ) {
    const subscribe = await this.blogSubscribeRepository.findById(id);
    if (!subscribe) {
      throw new HttpException(SubscribeValidationMessage.SubscribeDoesntExistsError, HttpStatus.FORBIDDEN);
    }
    if (subscribe.userId !== userId) {
      throw new HttpException(SubscribeValidationMessage.SubscribeDeleteForbidden, HttpStatus.FORBIDDEN);
    }
    return await this.blogSubscribeRepository.destroy(subscribe.id);
  }
}
