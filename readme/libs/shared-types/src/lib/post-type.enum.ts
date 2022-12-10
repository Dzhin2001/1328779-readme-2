export const PostTypeEnum = {
  Video: 'video',
  Text:  'text',
  Quote: 'quote',
  Photo: 'photo',
  Link:  'link',
}

export type PostTypeEnum = typeof PostTypeEnum[keyof typeof PostTypeEnum];

