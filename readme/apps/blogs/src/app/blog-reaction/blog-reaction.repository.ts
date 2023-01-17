import { CRUDRepository } from '@readme/core';
import { BlogReactionEntity } from './blog-reaction.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Reaction} from '@readme/shared-types';
import {LikeQuery} from '../like/query/like.query';
import {CommentQuery} from '../comment/query/comment.query';
import {SubscribeQuery} from '../subscribe/query/subscribe.query';

@Injectable()
export class BlogReactionRepository implements CRUDRepository<BlogReactionEntity, number, Reaction> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogReactionEntity): Promise<Reaction> {
    const {id, ...entityData} = item.toObject();
    return this.prisma.reaction.create({
      data: { ...entityData}
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.reaction.delete({
      where: {
        id,
      }
    });
  }

  public findById(id: number): Promise<Reaction | null> {
    return this.prisma.reaction.findFirst({
      where: {
        id,
      }
    });
  }

  public findByIdAndType(type: string, id: number): Promise<Reaction | null> {
    return this.prisma.reaction.findFirst({
      where: {
        type,
        id,
      }
    });
  }

  public find({limit, type, ids, postId, page}: LikeQuery | CommentQuery ): Promise<Reaction[]> {
    return this.prisma.reaction.findMany({
      where: {
        type,
        postId: postId,
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(updateId: number, item: BlogReactionEntity): Promise<Reaction> {
    const {id, postId, ...entityData} = item.toObject();
    return this.prisma.reaction.update({
      where: {
        id: updateId
      },
      data: { ...entityData}
    });
  }
}
