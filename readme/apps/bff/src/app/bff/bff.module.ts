import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffService } from './bff.service';
import {ConfigService} from '@nestjs/config';
import {ClientsModule} from '@nestjs/microservices';
import {RABBITMQ_SERVICE} from './bff.constant';
import {getRabbitMqConfig} from '../../../config/rabbitmq.config';
import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [BffController],
  providers: [BffService],
})
export class BffModule {}
