import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Headers,
  Patch,
  Delete,
  HttpException,
  Req, UseInterceptors, UploadedFile, Res,
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
import {User} from "@readme/shared-types";
import {UserRdo} from "./rdo/user.rdo";
import {UpdatePostDto} from "./dto/update-post.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as mime from "mime-types";
import {nanoid} from "nanoid";

@ApiTags('bff')
@Controller('bff')
export class BffPostController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService
  ) {}


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
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/video`, {...dto, author});
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
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/text`, {...dto, author});
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
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/quote`, {...dto, author});
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
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/photo`, {...dto, author});
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
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/link`, {...dto, author});
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
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/repost`, {...dto, author});
  }

  @Patch('posts/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User not allowed to update post.'
  })
  async patchPost(
    @Param('id') id: number,
    @Body() dto: UpdatePostDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffPatch<PostRdo>(`${ServiceUrl.Posts()}/${id}`, {...dto, author});
  }

  @Patch('posts/:id/photo')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './upload/photo',
      filename: (_req, file, callback) => {

        const extension = mime.extension(file.mimetype);
        const filename = nanoid();

        callback(null, `${filename}.${extension}`);
      }
    })
  }))
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new photo has been successfully created.'
  })
  async photo(
    @Param('id') id: string,
    @UploadedFile() file,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    const {id: author} = auth.user as UserRdo;
    const dto = {
      photoURL: file.filename,
      author: author
    }
    return await this.bffService.bffPatch<PostRdo>(`${ServiceUrl.Posts()}/${id}`, dto);
  }

  @Get('posts/photo/:imgpath')
  async seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return await res.sendFile(image, { root: './upload/photo' });
  }

  @Delete('posts/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'User not allowed to update post.'
  })
  async deletePost(
    @Param('id') id: number,
    @Body() dto: UpdatePostDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    const {id: author} = auth.user as UserRdo;
    return await this.bffService.bffDelete<PostRdo>(`${ServiceUrl.Posts()}/${id}/${author}`);
  }

  @Get('posts/:id')
  async getPost(@Param('id') id: number) {
    return await this.bffService.bffGet<PostRdo>(`${ServiceUrl.Posts()}/${id}`);
  }

  @Get('posts')
  async getPosts(@Req() {url}: Request) {
    return await this.bffService.bffGet<PostRdo>(`${ServiceUrl.Posts()}${url.substring(url.indexOf('?'))}`);
  }
}
