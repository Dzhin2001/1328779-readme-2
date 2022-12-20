import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {CommentService} from '../comment/comment.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateCommentDto} from './dto/create-comment.dto';
import {DeleteCommentDto} from './dto/delete-comment.dto';
import {CommentRdo} from './rdo/comment.rdo';
import {PostRdo} from "../post/rdo/post.rdo";

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
  async index() {
    const comments = await this.commentService.getComments();
    return fillObject(CommentRdo, comments);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully created.'
  })
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);
    return fillObject(CommentRdo, newComment);
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The comment has been successfully deleted.'
  })
  async delete(@Param('id') id: number) {
    const comment = await this.commentService.deleteComment(id);
    return fillObject(CommentRdo, comment);
  }
}
