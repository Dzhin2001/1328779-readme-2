import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {PostService} from './post.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {CreateRepostDto} from './dto/create-repost.dto';
import {PostRdo} from './rdo/post.rdo';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Post('video')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createVideo(@Body() dto: CreateVideoDto) {
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Post('text')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createText(@Body() dto: CreateTextDto) {
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Post('quote')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createQuote(@Body() dto: CreateQuoteDto) {
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Post('photo')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createPhoto(@Body() dto: CreatePhotoDto) {
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Post('link')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createLink(@Body() dto: CreateLinkDto) {
    const newPost = await this.postService.create(dto);
    return fillObject(PostRdo, newPost);
  }

  @Post('repost')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createRepost(@Body() dto: CreateRepostDto) {
    const newPost = await this.postService.createRepost(dto);
    return fillObject(PostRdo, newPost);
  }
}
