import {Post, PostTypeEnum} from '@readme/shared-types';

export class BlogPostEntity implements Post {
  public _id: string;
  public idOriginal: string;
  public isRepost: boolean;
  public postType: PostTypeEnum;
  public name: string;
  public author: string;
  public authorOriginal: string;
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

  constructor(blogPost: Post) {
    this.fillEntity(blogPost);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogPost: Post) {
    this._id = blogPost._id;
    this.idOriginal = blogPost.idOriginal;
    this.isRepost = blogPost.isRepost;
    this.postType = blogPost.postType;
    this.name = blogPost.name;
    this.author = blogPost.author;
    this.authorOriginal = blogPost.authorOriginal;
    this.date = blogPost.date;
    this.tags = blogPost.tags;
    this.textPreview = blogPost.textPreview;
    this.text = blogPost.text;
    this.quoteText = blogPost.quoteText;
    this.quoteAuthor = blogPost.quoteAuthor;
    this.videoURL = blogPost.videoURL;
    this.photoURL = blogPost.photoURL;
    this.linkText = blogPost.linkText;
    this.linkURL = blogPost.linkURL;
  }
}
