import {PostTypeEnum} from './post-type.enum';
import {Reaction} from './reaction.interface';

export interface Post {
  id?: number;
  idOriginal?: number;
  isRepost?: boolean;
  postType?: PostTypeEnum;
  name?: string;
  author?: string;
  date?: Date;
  tags?: string;
  textPreview?: string;
  text?: string;
  quoteText?: string;
  quoteAuthor?: string;
  videoURL?: string;
  photoURL?: string;
  linkText?: string;
  linkURL?: string;
  createdAt?: Date;
  reactions?: Reaction[];
}
