import { Reaction} from '@readme/shared-types';
import {Entity} from '@readme/core';

export class BlogReactionEntity implements Entity<BlogReactionEntity>, Reaction {
  public id: number;
  public type: string;
  public userId: string;
  public postId: number;
  public text: string;
  public isDelete: boolean;
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
    this.postId = blogReaction.postId;
    this.text = blogReaction.text;
    this.isDelete = blogReaction.isDelete;
    this.createdAt = blogReaction.createdAt;
  }
}
