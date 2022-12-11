import { Injectable } from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateCommentDto} from './dto/create-comment.dto';
import {DeleteCommentDto} from './dto/delete-comment.dto';
import {Post} from '@readme/shared-types';

@Injectable()
export class CommentService {
  constructor(
    private readonly blogReactionRepository: BlogReactionRepository
  ) {}

  async getComment(id: number): Promise<Post> {
    return this.blogReactionRepository.findById(id);
  }

  async getComments(): Promise<Post[]> {
    return this.blogReactionRepository.find()
  }

  async createComment(dto: CreateCommentDto ) {
    const reactionEntity = new BlogReactionEntity({...dto, type: 'comment', isDelete: false } );
    return this.blogReactionRepository.create(reactionEntity);
  }

  async deleteComment(id: number ) {
    const reaction = await this.blogReactionRepository.findById(id);
    const reactionEntity = new BlogReactionEntity({...reaction, isDelete: true});
    console.log(JSON.stringify(reactionEntity.toObject()));
    return this.blogReactionRepository.update(reaction.id, reactionEntity);
  }
}
