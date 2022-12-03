import {Reaction} from '@readme/shared-types';

export class BlogReactionEntity implements Reaction {
  public _id: string;
  public userId: string;
  public postId: string;
  public text: string;
  public isDelete: boolean;

  constructor(blogReaction: Reaction) {
    this.fillEntity(blogReaction);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogReaction: Reaction) {
    this._id = blogReaction._id;
    this.userId = blogReaction.userId;
    this.postId = blogReaction.postId;
    this.text = blogReaction.text;
    this.isDelete = blogReaction.isDelete;
  }
}
