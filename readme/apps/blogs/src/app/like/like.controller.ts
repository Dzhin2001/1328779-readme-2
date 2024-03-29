import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {LikeService} from './like.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateLikeDto} from './dto/create-like.dto';
import {LikeRdo} from './rdo/like.rdo';
import {LikeQuery} from './query/like.query';

@Controller('likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const like = await this.likeService.getLike(id);
    return fillObject(LikeRdo, like);
  }

  @Get('/')
  async index(@Query () query: LikeQuery) {
    const likes = await this.likeService.getLikes(query);
    return fillObject(LikeRdo, likes);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new like has been successfully created.'
  })
  async create(@Body() dto: CreateLikeDto) {
    const newLike = await this.likeService.createLike(dto);
    return fillObject(LikeRdo, newLike);
  }

  @Delete('/:id/:userId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The like has been successfully deleted.'
  })
  async delete(
    @Param('id') id: number,
    @Param('userId') userId: string
  ) {
    const like = await this.likeService.deleteLike(id, userId);
    return fillObject(LikeRdo, like);
  }
}
