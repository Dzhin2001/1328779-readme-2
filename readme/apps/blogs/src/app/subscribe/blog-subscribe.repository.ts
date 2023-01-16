import { CRUDRepository } from '@readme/core';
import { BlogSubscribeEntity } from './blog-subscribe.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Subscribe} from '@readme/shared-types';
import {SubscribeQuery} from '../subscribe/query/subscribe.query';

@Injectable()
export class BlogSubscribeRepository implements CRUDRepository<BlogSubscribeEntity, number, Subscribe> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogSubscribeEntity): Promise<Subscribe> {
    const {id, ...entityData} = item.toObject();
    return this.prisma.subscribe.create({
      data: { ...entityData}
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.subscribe.delete({
      where: {
        id,
      }
    });
  }

  public findById(id: number): Promise<Subscribe | null> {
    return this.prisma.subscribe.findFirst({
      where: {
        id,
      }
    });
  }

  public find({ids, userId, author}: SubscribeQuery): Promise<Subscribe[]> {
    return this.prisma.subscribe.findMany({
      where: {
        userId: userId,
        author: author,
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      },
    });
  }

  public update(updateId: number, item: BlogSubscribeEntity): Promise<Subscribe> {
    const {id, ...entityData} = item.toObject();
    return this.prisma.subscribe.update({
      where: {
        id: updateId
      },
      data: { ...entityData}
    });
  }
}
