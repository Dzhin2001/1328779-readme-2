import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {LikeService} from './like.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateLikeDto} from './dto/create-like.dto';
import {DeleteLikeDto} from './dto/delete-like.dto';
import {LikeRdo} from './rdo/like.rdo';

@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) {}

  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new like has been successfully created.'
  })
  async create(@Body() dto: CreateLikeDto) {
    const newLike = await this.likeService.create(dto);
    return fillObject(LikeRdo, newLike);
  }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The like has been successfully deleted.'
  })
  async delete(@Body() dto: DeleteLikeDto) {
    const newLike = await this.likeService.delete(dto);
    return fillObject(LikeRdo, newLike);
  }
}
