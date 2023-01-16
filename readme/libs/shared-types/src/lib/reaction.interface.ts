export interface Reaction {
  id?: number;
  type?: string;
  userId?: string;
  author?: string;
  postId?: number;
  text?: string;
  createdAt?: Date;
}
