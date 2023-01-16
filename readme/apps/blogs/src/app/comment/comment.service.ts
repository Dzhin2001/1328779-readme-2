import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateCommentDto} from './dto/create-comment.dto';
import {Post, ReactionTypeEnum} from '@readme/shared-types';
import {CommentQuery} from './query/comment.query';
import {BlogPostRepository} from '../blog-post/blog-post.repository';
import {
  COMMENT_CREATE_EXISTS_ERROR,
  COMMENT_CREATE_FORBIDDEN,
  COMMENT_DELETE_FORBIDDEN,
  COMMENT_DOESNT_EXISTS_ERROR
} from './comment.constant';

@Injectable()
export class CommentService {
  constructor(
    private readonly blogReactionRepository: BlogReactionRepository,
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getComment(id: number): Promise<Post> {
    return await this.blogReactionRepository.findByIdAndType(ReactionTypeEnum.Comment, id);
  }

  async getComments(query: CommentQuery): Promise<Post[]> {
    return await this.blogReactionRepository.find(query);
  }

  async createComment(dto: CreateCommentDto ) {
    const postId = +dto.postId;
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new HttpException(COMMENT_CREATE_EXISTS_ERROR, HttpStatus.FORBIDDEN);
    }
    if (post.isDraft) {
      throw new HttpException(COMMENT_CREATE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    const reactionEntity = new BlogReactionEntity({...dto, type: ReactionTypeEnum.Comment } );
    return await this.blogReactionRepository.create(reactionEntity);
  }

  async deleteComment(id: number, userId: string  ) {
    const reaction = await this.blogReactionRepository.findByIdAndType(ReactionTypeEnum.Comment, id);
    if (!reaction) {
      throw new HttpException(COMMENT_DOESNT_EXISTS_ERROR, HttpStatus.FORBIDDEN);
    }
    if (reaction.userId !== userId || reaction.isDelete) {
      throw new HttpException(COMMENT_DELETE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    return await this.blogReactionRepository.destroy(reaction.id);
  }
}
