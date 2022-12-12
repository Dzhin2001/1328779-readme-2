import { CRUDRepository } from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {Post} from '@readme/shared-types';
import {PostQuery} from '../post/query/post.query';

@Injectable()
export class BlogPostRepository implements CRUDRepository<BlogPostEntity, number, Post> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<Post> {
    const {id, ...entityData} = item.toObject();
    return this.prisma.post.create({
      data: {
        ...entityData,
        reactions: {
          connect: [...entityData.reactions]
        }
      },
      include: {
        reactions: true,
    }
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

  public find({limit, sortDirection, page}: PostQuery): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        reactions: true,
      },
    });
  }

  public update(id: number, item: BlogPostEntity): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
