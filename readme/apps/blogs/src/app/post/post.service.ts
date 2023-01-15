import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BlogPostRepository} from '../blog-post/blog-post.repository';
import {BlogPostEntity} from '../blog-post/blog-post.entity';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {CreateRepostDto} from './dto/create-repost.dto';
import {PostQuery} from './query/post.query';
import {Post} from '@readme/shared-types';
import {UpdateDto} from './dto/update.dto';
import {POST_DELETE_FORBIDDEN, POST_UPDATE_FORBIDDEN} from './post.constant';

@Injectable()
export class PostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  async getPost(id: number): Promise<Post> {
    return this.blogPostRepository.findById(id);
  }

  async getPosts(query: PostQuery): Promise<Post[]> {
    return this.blogPostRepository.find(query)
  }

  async createPost(dto: CreateVideoDto | CreateTextDto | CreateQuoteDto | CreatePhotoDto | CreateLinkDto, postType: string ) {
    const postEntity = new BlogPostEntity({...dto, postType: postType});
    return this.blogPostRepository.create(postEntity);
  }

  async createRepost(dto: CreateRepostDto ) {
    const {idOriginal, author} = dto;
    const postOriginal = await this.blogPostRepository.findById(+idOriginal);
    const postNew ={
      ...postOriginal
      ,author: author
      ,isRepost: true
    };
    const postEntity = new BlogPostEntity(postNew);
    return this.blogPostRepository.create(postEntity);
  }

  async updateAndValidate(id: number, dto: UpdateDto) {
    const {author} = dto;
    const postOriginal = await this.blogPostRepository.findById(id);
    if (postOriginal.author !== author) {
      throw new HttpException(POST_UPDATE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    const postEntity = new BlogPostEntity({...dto});
    return await this.blogPostRepository.update(id, postEntity);
  }

  async deleteAndValidate(id: number, author: string): Promise<void> {
    const postOriginal = await this.blogPostRepository.findById(id);
    if (postOriginal.author !== author) {
      throw new HttpException(POST_DELETE_FORBIDDEN, HttpStatus.FORBIDDEN);
    }
    return await this.blogPostRepository.destroy(id);
  }


}
