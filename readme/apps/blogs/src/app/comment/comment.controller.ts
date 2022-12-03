import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import {CommentService} from '../comment/comment.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateCommentDto} from './dto/create-comment.dto';
import {DeleteCommentDto} from './dto/delete-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new comment has been successfully created.'
  })
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillObject(CommentRdo, newComment);
  }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully deleted.'
  })
  async delete(@Body() dto: DeleteCommentDto) {
    const newComment = await this.commentService.delete(dto);
    return fillObject(CommentRdo, newComment);
  }
}
