import { Injectable } from '@nestjs/common';
import {BlogPostMemoryRepository} from '../blog-post/blog-post-memory.repository';
import {BlogPostEntity} from '../blog-post/blog-post.entity';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {CreateRepostDto} from './dto/create-repost.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly blogPostRepository: BlogPostMemoryRepository
  ) {}

  async create(dto: CreateVideoDto | CreateTextDto | CreateQuoteDto | CreatePhotoDto | CreateLinkDto ) {
    const postEntity = new BlogPostEntity(dto);
    return this.blogPostRepository.create(postEntity);
  }

  async createRepost(dto: CreateRepostDto ) {
    const {idOriginal} = dto;
    const postOriginal = await this.blogPostRepository.findById(idOriginal);
    const postNew ={
      ...postOriginal
      ,_id: ''
      ,author: ''
      ,idOriginal
      ,authorOriginal: postOriginal.author
      ,isRepost: true
    };
    const postEntity = new BlogPostEntity(postNew);
    return this.blogPostRepository.create(postEntity);
  }
}
