import {ReactionTypeEnum} from './reaction-type.enum';
import {Post} from './post.interface';

export interface Reaction {
  id?: number;
  type?: string;
  userId?: string;
  postId?: number;
  text?: string;
  isDelete?: boolean;
  createdAt?: Date;
}
