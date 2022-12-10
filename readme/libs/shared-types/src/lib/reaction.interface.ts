import {ReactionTypeEnum} from './reaction-type.enum';

export interface Reaction {
  id?: number;
  type?: ReactionTypeEnum;
  userId?: string;
  postId?: number;
  text?: string;
  isDelete?: boolean;
  createdAt?: Date;
}
