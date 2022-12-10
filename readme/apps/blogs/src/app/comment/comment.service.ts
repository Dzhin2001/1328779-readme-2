import { Injectable } from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateCommentDto} from './dto/create-comment.dto';
import {DeleteCommentDto} from './dto/delete-comment.dto';
import {ReactionTypeEnum} from '@readme/shared-types';

@Injectable()
export class CommentService {
  constructor(
    private readonly blogReactionRepository: BlogReactionRepository
  ) {}

  async create(dto: CreateCommentDto ) {
    const reactionEntity = new BlogReactionEntity({...dto, type: ReactionTypeEnum.Comment, isDelete: false } );
    return this.blogReactionRepository.create(reactionEntity);
  }

  async delete(dto: DeleteCommentDto ) {
    const {id} = dto;
    const reaction = await this.blogReactionRepository.findById(+id);
    const reactionEntity = new BlogReactionEntity({...reaction, isDelete: true});
    return this.blogReactionRepository.update(reaction.id, reactionEntity);
  }
}
