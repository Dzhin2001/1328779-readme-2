import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Headers,
  Delete,
  HttpException,
  Req,
  Res
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {BffService} from './bff.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';
import {HttpService} from '@nestjs/axios';
import {AUTH_ONLY_ANONYMOUS, ServiceUrl} from './bff.constant';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {LoginUserDto} from './dto/login-user.dto';
import {ChangePasswordUserDto} from './dto/change-password-user.dto';
import {LikeRdo} from './rdo/like.rdo';
import {CreateLikeDto} from './dto/create-like.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {CreateCommentDto} from './dto/create-comment.dto';
import {PostRdo} from './rdo/post.rdo';
import {PostQuery} from './query/post.query';
import {CreateVideoDto} from './dto/create-video.dto';
import {CreateTextDto} from './dto/create-text.dto';
import {CreateQuoteDto} from './dto/create-quote.dto';
import {CreatePhotoDto} from './dto/create-photo.dto';
import {CreateLinkDto} from './dto/create-link.dto';
import {CreateRepostDto} from './dto/create-repost.dto';
import {fillObject} from "@readme/core";

@ApiTags('bff')
@Controller('bff')
export class BffController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService
  ) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Available Only for anonymous user.'
  })
  async register(
    @Body() dto: CreateUserDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (auth.status) {
      throw new HttpException(AUTH_ONLY_ANONYMOUS, HttpStatus.FORBIDDEN);
    }
    return this.bffService.bffPost<UserRdo>(ServiceUrl.Register(), dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async login(
    @Body() dto: LoginUserDto
  ) {
    return await this.bffService.bffPost<LoggedUserRdo>(ServiceUrl.Login(), dto);
  }

  @Get('user/:id')
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized.',
  })
  async user(
    @Param('id') id: string,
    @Headers('Authorization') token: string
  ) {
    return await this.bffService.bffGet<UserRdo>(`${ServiceUrl.User()}/${id}`, token);
  }

  @Post('password')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User password has been changed.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  async changePassword(
    @Body() dto: ChangePasswordUserDto,
    @Headers('Authorization') token: string
  ) {
    return await this.bffService.bffPost<UserRdo>(ServiceUrl.Password(), dto, token);
  }

  @Get('avatar/:imgpath')
  async seeUploadedFile(@Param('imgpath') imgpath) {
    return await this.bffService.bffGetFile(`${ServiceUrl.Avatar()}/${imgpath}`);
  }



  @Get('likes/:id')
  async like(@Param('id') id: number) {
    return await this.bffService.bffGet<LikeRdo>(`${ServiceUrl.Likes()}/${id}`);
  }

  @Get('likes')
  async likes() {
    return await this.bffService.bffGet<LikeRdo>(ServiceUrl.Likes());
  }

  @Post('likes')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new like has been successfully created.'
  })
  async createLike(@Body() dto: CreateLikeDto) {
    return await this.bffService.bffPost<LikeRdo>(ServiceUrl.Likes(), dto);
  }

  @Delete('likes/:id')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The like has been successfully deleted.'
  })
  async deleteLike(@Param('id') id: number) {
    return await this.bffService.bffDelete<LikeRdo>(`${ServiceUrl.Likes()}/${id}`);
  }

  @Get('comments/:id')
  async show(@Param('id') id: number) {
    return await this.bffService.bffGet<CommentRdo>(`${ServiceUrl.Comments()}/${id}`);
  }

  @Get('comments')
  async index() {
    return await this.bffService.bffGet<CommentRdo>(ServiceUrl.Comments());
  }

  @Post('comments')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully created.'
  })
  async create(@Body() dto: CreateCommentDto) {
    return await this.bffService.bffPost<CommentRdo>(ServiceUrl.Comments(), dto);
  }

  @Delete('comments/:id')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully deleted.'
  })
  async delete(@Param('id') id: number) {
    return await this.bffService.bffDelete<CommentRdo>(`${ServiceUrl.Comments()}/${id}`);
  }


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
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/video`, dto, token);
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
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/text`, dto, token);
  }

  @Post('posts/quote')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.'
  })
  async createQuotePost(
    @Body() dto: CreateQuoteDto,
    @Headers('Authorization') token: string) {
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/quote`, dto, token);
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
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/photo`, dto, token);
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
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/link`, dto, token);
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
    return await this.bffService.bffPost<PostRdo>(`${ServiceUrl.Posts()}/repost`, dto, token);
  }
}
