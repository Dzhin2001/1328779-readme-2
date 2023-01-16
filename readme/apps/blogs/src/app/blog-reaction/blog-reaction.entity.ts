import { Reaction} from '@readme/shared-types';
import {Entity} from '@readme/core';

export class BlogReactionEntity implements Entity<BlogReactionEntity>, Reaction {
  public id: number;
  public type: string;
  public userId: string;
  public author: string;
  public postId: number;
  public text: string;
  public createdAt: Date;

  constructor(blogReaction: Reaction) {
    this.fillEntity(blogReaction);
  }

  public toObject(): BlogReactionEntity {
    return {...this};
  }

  public fillEntity(blogReaction: Reaction): void {
    this.type = blogReaction.type;
    this.userId = blogReaction.userId;
    this.author = blogReaction.author;
    this.postId = blogReaction.postId;
    this.text = blogReaction.text;
    this.createdAt = blogReaction.createdAt;
  }
}
