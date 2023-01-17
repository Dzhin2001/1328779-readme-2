import { Subscribe} from '@readme/shared-types';
import {Entity} from '@readme/core';

export class BlogSubscribeEntity implements Entity<BlogSubscribeEntity>, Subscribe {
  public id: number;
  public userId: string;
  public author: string;
  public createdAt: Date;

  constructor(blogSubscribe: Subscribe) {
    this.fillEntity(blogSubscribe);
  }

  public toObject(): BlogSubscribeEntity {
    return {...this};
  }

  public fillEntity(blogSubscribe: Subscribe): void {
    this.userId = blogSubscribe.userId;
    this.author = blogSubscribe.author;
    this.createdAt = blogSubscribe.createdAt;
  }
}
