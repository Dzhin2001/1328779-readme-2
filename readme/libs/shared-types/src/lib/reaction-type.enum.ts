export const ReactionTypeEnum = {
  Comment: 'comment',
  Like:  'like',
  Subscribe:  'subscribe',
}

export type ReactionTypeEnum = typeof ReactionTypeEnum[keyof typeof ReactionTypeEnum];
