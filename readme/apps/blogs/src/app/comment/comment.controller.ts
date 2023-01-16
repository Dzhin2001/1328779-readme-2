import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {CommentService} from '../comment/comment.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateCommentDto} from './dto/create-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {CommentQuery} from './query/comment.query';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const comment = await this.commentService.getComment(id);
    return fillObject(CommentRdo, comment);
  }

  @Get('/')
  async index(@Query () query: CommentQuery) {
    const comments = await this.commentService.getComments(query);
    return fillObject(CommentRdo, comments);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully created.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The comment can not be created.'
  })
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('/:id/:userId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully deleted.'
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The comment can not be deleted.'
  })
  async delete(
    @Param('id') id: number,
    @Param('userId') userId: string
  ) {
    const comment = await this.commentService.deleteComment(id, userId);
    return fillObject(CommentRdo, comment);
  }
}
