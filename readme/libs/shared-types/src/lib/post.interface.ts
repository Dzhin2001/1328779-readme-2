import {PostTypeEnum} from './post-type.enum';

export interface Post {
  _id?: string;
  idOriginal?: string;
  isRepost?: boolean;
  postType?: PostTypeEnum;
  name?: string;
  author?: string;
  authorOriginal?: string;
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
}
