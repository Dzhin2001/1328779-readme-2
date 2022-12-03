import { Injectable } from '@nestjs/common';
import {CRUDRepository} from '@readme/core';
import * as crypto from 'crypto';
import {Reaction, ReactionTypeEnum, User} from '@readme/shared-types';
import {BlogReactionEntity} from './blog-reaction.entity';

@Injectable()
export class BlogReactionMemoryRepository implements CRUDRepository<BlogReactionEntity, string, Reaction> {
  private repository: {[key: string]: Reaction} = {};

  public async create(item: BlogReactionEntity): Promise<Reaction> {
    const entry = { ...item.toObject(), _id: crypto.randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<Reaction> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByPost(id: string, type: ReactionTypeEnum): Promise<Reaction> {

    const existReaction = Object.values(this.repository)
      .find((reactionItem) => reactionItem.postId === id && reactionItem.type === type );

    if (! existReaction) {
      return null;
    }

    return { ...existReaction};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: BlogReactionEntity): Promise<Reaction> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
