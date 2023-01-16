import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {SubscribeService} from './subscribe.service';
import {ApiResponse} from '@nestjs/swagger';
import {fillObject} from '@readme/core';
import {CreateSubscribeDto} from './dto/create-subscribe.dto';
import {SubscribeRdo} from './rdo/subscribe.rdo';
import {SubscribeQuery} from './query/subscribe.query';

@Controller('subscribes')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: number) {
    const subscribe = await this.subscribeService.getSubscribe(id);
    return fillObject(SubscribeRdo, subscribe);
  }

  @Get('/')
  async index(@Query () query: SubscribeQuery) {
    const subscribes = await this.subscribeService.getSubscribes(query);
    return fillObject(SubscribeRdo, subscribes);
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new subscribe has been successfully created.'
  })
  async create(@Body() dto: CreateSubscribeDto) {
    const newSubscribe = await this.subscribeService.createSubscribe(dto);
    return fillObject(SubscribeRdo, newSubscribe);
  }

  @Delete('/:id/:userId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The subscribe has been successfully deleted.'
  })
  async delete(
    @Param('id') id: number,
    @Param('userId') userId: string
  ) {
    const subscribe = await this.subscribeService.deleteSubscribe(id, userId);
    return fillObject(SubscribeRdo, subscribe);
  }
}
