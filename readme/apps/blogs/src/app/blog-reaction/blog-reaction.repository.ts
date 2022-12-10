import { CRUDRepository } from '@readme/core';
import { BlogReactionEntity } from './blog-reaction.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {Reaction} from '@readme/shared-types';

@Injectable()
export class BlogReactionRepository implements CRUDRepository<BlogReactionEntity, number, Reaction> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogReactionEntity): Promise<Reaction> {
    return;
    // return this.prisma.reaction.create({
    //   data: { ...item.toObject() }
    // });
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
        id
      }
    });
  }

  public find(ids: number[] = []): Promise<Reaction[]> {
    return this.prisma.reaction.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(id: number, item: BlogReactionEntity): Promise<Reaction> {
    return;
    // return this.prisma.reaction.update({
    //   where: {
    //     id
    //   },
    //   data: { ...item.toObject(), id}
    // });
  }
}
