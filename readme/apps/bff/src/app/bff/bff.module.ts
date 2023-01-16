import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffUserController } from './bff.user.controller';
import { BffPostController } from './bff.post.controller';
import { BffService } from './bff.service';
import {ConfigService} from '@nestjs/config';

import {HttpModule} from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
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
