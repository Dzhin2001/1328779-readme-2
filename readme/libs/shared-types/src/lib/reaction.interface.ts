import {ReactionTypeEnum} from './reaction-type.enum';

export interface Reaction {
  _id?: string;
  type?: ReactionTypeEnum;
  userId?: string;
  postId?: string;
  text?: string;
  isDelete?: boolean;
}
