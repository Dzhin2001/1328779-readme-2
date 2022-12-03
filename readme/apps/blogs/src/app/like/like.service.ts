import { Injectable } from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionMemoryRepository} from '../blog-reaction/blog-reaction-memory.repository';
import {CreateLikeDto} from './dto/create-like.dto';
import {DeleteLikeDto} from './dto/delete-like.dto';
import {ReactionTypeEnum} from '@readme/shared-types';

@Injectable()
export class LikeService {
  constructor(
    private readonly blogReactionRepository: BlogReactionMemoryRepository
  ) {}

  async create(dto: CreateLikeDto ) {
    const reactionEntity = new BlogReactionEntity({...dto, type: ReactionTypeEnum.Like } );
    return this.blogReactionRepository.create(reactionEntity);
  }

  async delete(dto: DeleteLikeDto ) {
    const {id} = dto;
    const reaction = await this.blogReactionRepository.findById(id);
    const reactionEntity = new BlogReactionEntity({...reaction, isDelete: false});
    return this.blogReactionRepository.update(reaction._id, reactionEntity);
  }
}
