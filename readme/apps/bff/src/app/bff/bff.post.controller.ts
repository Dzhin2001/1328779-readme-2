import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Headers,
  Delete,
  HttpException,
  Req,
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {BffService} from './bff.service';
import {HttpService} from '@nestjs/axios';
import {AUTH_USER_NOT_AUTHORISED, ServiceUrl} from './bff.constant';
import {PostRdo} from './rdo/post.rdo';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {CreateRepostDto} from './dto/create-repost.dto';

@ApiTags('bff')
@Controller('bff')
export class BffPostController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService
  ) {}

  @Get('posts/:id')
  async getPost(@Param('id') id: number) {
    return await this.bffService.bffGet<PostRdo>(`${ServiceUrl.Posts()}/${id}`);
  }

  @Get('posts')
  async getPosts(@Req() {url}: Request) {
    return await this.bffService.bffGet<PostRdo>(`${ServiceUrl.Posts()}${url.substring(url.indexOf('?'))}`);
  }

  @Post('posts/video')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createVideoPost(
    @Body() dto: CreateVideoDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/video`, dto);
  }

  @Post('posts/text')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createTextPost(
    @Body() dto: CreateTextDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/text`, dto);
  }

  @Post('posts/quote')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createQuotePost(
    @Body() dto: CreateQuoteDto,
    @Headers('Authorization') token: string) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/quote`, dto);
  }

  @Post('posts/photo')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createPhotoPost(
    @Body() dto: CreatePhotoDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/photo`, dto);
  }

  @Post('posts/link')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createLinkPost(
    @Body() dto: CreateLinkDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/link`, dto);
  }

  @Post('posts/repost')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createRepostPost(
    @Body() dto: CreateRepostDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/repost`, dto);
  }
}
