import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateLikeDto} from './dto/create-like.dto';
import {Post, ReactionTypeEnum} from '@readme/shared-types';
import {BlogPostRepository} from '../blog-post/blog-post.repository';
import {LikeValidationMessage} from './like.constant';
import {LikeQuery} from './query/like.query';

@Injectable()
export class LikeService {
  constructor(
    private readonly blogReactionRepository: BlogReactionRepository,
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getLike(id: number): Promise<Post> {
    return await this.blogReactionRepository.findByIdAndType(ReactionTypeEnum.Like, id);
  }

  async getLikes(query: LikeQuery): Promise<Post[]> {
    return await this.blogReactionRepository.find(query);
  }

  async createLike(dto: CreateLikeDto ) {
    const postId = +dto.postId;
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new HttpException(LikeValidationMessage.LikeCreateExistsError, HttpStatus.FORBIDDEN);
    }
    if (post.isDraft) {
      throw new HttpException(LikeValidationMessage.LikeCreateForbidden, HttpStatus.FORBIDDEN);
    }
    const query = new LikeQuery;
    query.postId = postId;
    const likes = await this.blogReactionRepository.find(query);
    if (likes.length > 0) {
      throw new HttpException(LikeValidationMessage.LikeAlreadyExists, HttpStatus.FORBIDDEN);
    }
    const reactionEntity = new BlogReactionEntity({...dto, type: ReactionTypeEnum.Like } );
    return await this.blogReactionRepository.create(reactionEntity);
  }

  async deleteLike(id: number, userId: string ) {
    const reaction = await this.blogReactionRepository.findByIdAndType(ReactionTypeEnum.Like, id);
    if (!reaction) {
      throw new HttpException(LikeValidationMessage.LikeDoesntExistsError, HttpStatus.FORBIDDEN);
    }
    if (reaction.userId !== userId) {
      throw new HttpException(LikeValidationMessage.LikeDeleteForbidden, HttpStatus.FORBIDDEN);
    }
    return await this.blogReactionRepository.destroy(reaction.id);
  }
}
