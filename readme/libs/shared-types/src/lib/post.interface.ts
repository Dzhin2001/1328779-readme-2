import {Reaction} from './reaction.interface';

export interface Post {
  id?: number;
  idOriginal?: number;
  isRepost?: boolean;
  isDraft?: boolean;
  postType?: string;
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
  likeCount?: number;
  commentCount?: number;
}
