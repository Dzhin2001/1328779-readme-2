import {CRUDRepository, fillObject} from '@readme/core';
import { BlogPostEntity } from './blog-post.entity';
import { PrismaService } from '../prisma/prisma.service';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Post} from '@readme/shared-types';
import {PostQuery} from '../post/query/post.query';
import {Prisma} from "@prisma/client/scripts/default-index";
import {PostRdo} from "../post/rdo/post.rdo";
import {POST_DELETE_FORBIDDEN} from "../post/post.constant";

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

  public async findById(id: number): Promise<Post | null> {
    return await this.prisma.post.findFirst({
      where: {
        id,
      }
    });
  }

  public async find(
    {
      limit,
      idOriginal,
      isDraft,
      name,
      tags,
      postTypes,
      authors,
      sortField,
      sortDirection,
      page
    }: PostQuery): Promise<Post[]> {

    const arrToParam = (arr) => arr.map( (e) => `'${e}'`).join(',');

    let sqlWhere = ' true '
    sqlWhere += (!!idOriginal) ? ` AND "idOriginal"=${idOriginal}` : '';
    sqlWhere += (!!isDraft) ? ` AND "isDraft"=${isDraft ? 'true' : 'false'}` : '';
    sqlWhere += (!!name) ? ` AND "name" LIKE '%${name}%'` : '';
    sqlWhere += (!!tags) ? ` AND "tags" like '%${tags}%'` : '';
    sqlWhere += ((!!postTypes) && (postTypes.length > 0)) ? ` AND "postType" in (${arrToParam(postTypes)})` : '';
    sqlWhere += ((!!authors) && (authors.length > 0)) ? ` AND "author" in (${arrToParam(authors)})` : '';

    const sql = `
      SELECT
        "id",
        "idOriginal",
        "isRepost",
        "isDraft",
        "postType",
        "name",
        "author",
        "date",
        "tags",
        "textPreview",
        "text",
        "quoteText",
        "quoteAuthor",
        "videoURL",
        "photoURL",
        "linkText",
        "linkURL",
        "createdAt",
        (
          select cast(count(*) as INTEGER)
          from public."Reaction" as "R"
          where "R"."type"='like' and "R"."postId"="Post"."id"
        ) as "likeCount",
        (
          select cast(count(*) as INTEGER)
          from public."Reaction" as "R"
          where "R"."type"='comment' and "R"."postId"="Post"."id"
        ) as "commentCount"
      FROM public."Post"
      WHERE ${sqlWhere}
      ORDER BY "${sortField}" ${sortDirection}
      LIMIT ${limit}
      OFFSET ${page > 0 ? limit * (page - 1) : 0}
    `;
    try {
      const req = await this.prisma.$queryRawUnsafe(sql);
      return req as Post[];
    } catch (e) {
      throw new HttpException(e.messageerror, HttpStatus.BAD_REQUEST);
    }
  }

  public async find2(
    {
      limit,
      idOriginal,
      isDraft,
      name,
      tags,
      postTypes,
      authors,
      sortField,
      sortDirection,
      page
    }: PostQuery): Promise<Post[]> {

    const order = () => {
      if (sortField === 'likeCount')
        return ({id: sortDirection})
      else if (sortField === 'commentCount')
        return ({name: sortDirection})
      else
        return ({createdAt: sortDirection})
    };

    return this.prisma.post.findMany({
      include: {
        _count: {
          select: {
            reactions: {
              where: {type: 'like'}
            },
          },
        },
      },
      where: {
        postType: {
          in: postTypes,
        },
        author: {
          in: authors,
        },
        isDraft: isDraft,
        idOriginal: idOriginal,
        name: {
          contains: name,
          mode: 'insensitive',
        },
        tags: {
          contains: tags,
          mode: 'insensitive',
        },
      },
      take: limit,
      orderBy: [order()],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: BlogPostEntity): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id
      },
      include: {
        reactions: true,
      },
      data: {
        ...item.toObject(),
        id,
        reactions: { set: [...item.reactions] }
      }
    });
  }
}
