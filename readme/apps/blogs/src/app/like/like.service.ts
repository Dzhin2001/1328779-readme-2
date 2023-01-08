import { Injectable } from '@nestjs/common';
import {BlogReactionEntity} from '../blog-reaction/blog-reaction.entity';
import {BlogReactionRepository} from '../blog-reaction/blog-reaction.repository';
import {CreateLikeDto} from './dto/create-like.dto';
import {Post, ReactionTypeEnum} from '@readme/shared-types';

@Injectable()
export class LikeService {
  constructor(
    private readonly blogReactionRepository: BlogReactionRepository
  ) {}

  async getLike(id: number): Promise<Post> {
    return this.blogReactionRepository.findById(id);
  }

  async getLikes(): Promise<Post[]> {
    return this.blogReactionRepository.find()
  }

  async createLike(dto: CreateLikeDto ) {
    const reactionEntity = new BlogReactionEntity({...dto, type: ReactionTypeEnum.Like } );
    return this.blogReactionRepository.create(reactionEntity);
  }

  async deleteLike(id: number ) {
    const reaction = await this.blogReactionRepository.findById(id);
    const reactionEntity = new BlogReactionEntity({...reaction, isDelete: false});
    return this.blogReactionRepository.update(reaction.id, reactionEntity);
  }
}
