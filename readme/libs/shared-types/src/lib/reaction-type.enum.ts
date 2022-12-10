export const ReactionTypeEnum = {
  Comment: 'comment',
  Like:  'like',
}

export type ReactionTypeEnum = typeof ReactionTypeEnum[keyof typeof ReactionTypeEnum];
