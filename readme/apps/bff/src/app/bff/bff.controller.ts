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
import {LikeRdo} from './rdo/like.rdo';
import {CreateLikeDto} from './dto/create-like.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {CreateCommentDto} from './dto/create-comment.dto';

@ApiTags('bff')
@Controller('bff')
export class BffController {
  constructor(
    private readonly httpService: HttpService,
    private readonly bffService: BffService
  ) {}

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
  async createLike(
    @Body() dto: CreateLikeDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<LikeRdo>(ServiceUrl.Likes(), dto);
  }

  @Delete('likes/:id')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The like has been successfully deleted.'
  })
  async deleteLike(
    @Param('id') id: number,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
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
  async create(
    @Body() dto: CreateCommentDto,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffPost<CommentRdo>(ServiceUrl.Comments(), dto);
  }

  @Delete('comments/:id')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully deleted.'
  })
  async delete(
    @Param('id') id: number,
    @Headers('Authorization') token: string
  ) {
    const auth = await this.bffService.bffValidateToken(token);
    if (!auth.status) {
      throw new HttpException(AUTH_USER_NOT_AUTHORISED, HttpStatus.UNAUTHORIZED);
    }
    return await this.bffService.bffDelete<CommentRdo>(`${ServiceUrl.Comments()}/${id}`);
  }

}
