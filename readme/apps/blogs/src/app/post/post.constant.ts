export enum PostQueryDefault {
  PostQueryCountLimit = 25,
  PostQuerySearchLimit = 20,
  PostQuerySortDirection = 'desc',
}

export const TAGS_MAX_COUNT = 8;
export const TAGS_MIN_LENGTH = 3;
export const TAGS_MAX_LENGTH = 10;

export const TAGS_ERROR = 'Tags is not validate.';

export const POST_UPDATE_FORBIDDEN = 'User not allowed to change post.';
export const POST_DELETE_FORBIDDEN = 'User not allowed to delete post.';
export const POST_REPOST_FORBIDDEN = 'Post not allowed to repost. Post was reposted.';
