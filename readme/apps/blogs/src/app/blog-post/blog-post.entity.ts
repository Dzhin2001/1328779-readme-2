import {Post, Reaction} from '@readme/shared-types';
import { Entity } from '@readme/core';

export class BlogPostEntity implements Entity<BlogPostEntity>, Post {
  public id: number;
  public idOriginal: number;
  public isRepost: boolean;
  public isDraft: boolean;
  public postType: string;
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

  public toObject():BlogPostEntity {
    return {
      ...this
      ,reactions: this.reactions.map(({id}) => ({id}))
    };
  }

  public fillEntity(blogPost: Post): void {
    this.idOriginal = blogPost.idOriginal;
    this.isRepost = blogPost.isRepost;
    this.isDraft = blogPost.isDraft;
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
    this.reactions = [];
  }
}
