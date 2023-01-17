import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffUserController } from './bff.user.controller';
import { BffPostController } from './bff.post.controller';
import { BffService } from './bff.service';
import {HttpModule} from '@nestjs/axios';
import {HttpServiceDefault} from './bff.constant';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpServiceDefault.HttpTimeout,
      maxRedirects: HttpServiceDefault.HttpMaxRedirects,
    }),
  ],
  controllers: [
    BffController,
    BffUserController,
    BffPostController
  ],
  providers: [BffService],
})
export class BffModule {}
