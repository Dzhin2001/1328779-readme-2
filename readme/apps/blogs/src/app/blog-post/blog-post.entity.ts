import {Post, PostTypeEnum, Reaction} from '@readme/shared-types';

export class BlogPostEntity implements Post {
  public id: number;
  public idOriginal: number;
  public isRepost: boolean;
  public postType: PostTypeEnum;
  public name: string;
  public author: string;
  public date: Date;
  public tags: string;
  public textPreview: string;
  public text: string;
  public quoteText: string;
  public quoteAuthor: string;
  public videoURL: string;
  public photoURL: string;
  public linkText: string;
  public linkURL: string;
  public createdAt: Date;
  public reactions: Reaction[];

  constructor(blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject() {
    return {
      ...this
      ,reactions: this.reactions.map(({id}) => ({id}))
    };
  }

  public fillEntity(blogPost: Post) {
    this.id = blogPost.id;
    this.idOriginal = blogPost.idOriginal;
    this.isRepost = blogPost.isRepost;
    this.postType = blogPost.postType;
    this.name = blogPost.name;
    this.author = blogPost.author;
    this.date = new Date();
    this.tags = blogPost.tags;
    this.textPreview = blogPost.textPreview;
    this.text = blogPost.text;
    this.quoteText = blogPost.quoteText;
    this.quoteAuthor = blogPost.quoteAuthor;
    this.videoURL = blogPost.videoURL;
    this.photoURL = blogPost.photoURL;
    this.linkText = blogPost.linkText;
    this.linkURL = blogPost.linkURL;
    this.createdAt = new Date();
    this.reactions = [...blogPost.reactions];
  }
}
