import { CRUDRepository } from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {Post} from '@readme/shared-types';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
    const entityData = item.toObject();
    return this.prisma.post.create({
      data: {
        id: null,
        ...entityData,
      },
      // reactions: { connect: { id: entityData.id } },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      }
    });
  }

  public findById(id: number): Promise<Post | null> {
    return this.prisma.post.findFirst({
      where: {
        id
      }
    });
  }

  public find(ids: number[] = []): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }

  public update(id: number, item: BlogPostEntity): Promise<Post> {
    return;
    // return this.prisma.post.update({
    //   where: {
    //     id
    //   },
    //   data: { ...item.toObject(), id}
    // });
  }
}
