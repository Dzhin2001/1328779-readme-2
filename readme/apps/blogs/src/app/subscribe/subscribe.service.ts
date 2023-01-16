import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateSubscribeDto} from './dto/create-subscribe.dto';
import {Post, ReactionTypeEnum} from '@readme/shared-types';
import {BlogPostRepository} from '../blog-post/blog-post.repository';
import {
  SUBSCRIBE_ALREADY_EXISTS,
  SUBSCRIBE_CREATE_EXISTS_ERROR,
  SUBSCRIBE_CREATE_FORBIDDEN, SUBSCRIBE_DOESNT_EXISTS_ERROR,
  SUBSCRIBE_DELETE_FORBIDDEN
} from './subscribe.constant';
import {SubscribeQuery} from './query/subscribe.query';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly blogReactionRepository: BlogReactionRepository,
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getSubscribe(id: number): Promise<Post> {
    return await this.blogReactionRepository.findByIdAndType(ReactionTypeEnum.Subscribe, id);
  }

  async getSubscribes(query: SubscribeQuery): Promise<Post[]> {
    return await this.blogReactionRepository.find(query);
  }

  async createSubscribe(dto: CreateSubscribeDto ) {
    const {author} = dto;
    const query = new SubscribeQuery;
    query.author = author;
    const subscribes = await this.blogReactionRepository.find(query);
    if (subscribes.length > 0) {
      throw new HttpException(SUBSCRIBE_ALREADY_EXISTS, HttpStatus.FORBIDDEN);
    }
    const reactionEntity = new BlogReactionEntity({...dto, type: ReactionTypeEnum.Subscribe } );
    return await this.blogReactionRepository.create(reactionEntity);
  }

  async deleteSubscribe(id: number, userId: string ) {
    const reaction = await this.blogReactionRepository.findByIdAndType(ReactionTypeEnum.Subscribe, id);
    if (!reaction) {
      throw new HttpException(SUBSCRIBE_DOESNT_EXISTS_ERROR, HttpStatus.FORBIDDEN);
    }
    if (reaction.userId !== userId || reaction.isDelete) {
      throw new HttpException(SUBSCRIBE_DELETE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    return await this.blogReactionRepository.destroy(reaction.id);
  }
}
