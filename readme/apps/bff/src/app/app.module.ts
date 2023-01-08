import { Module } from '@nestjs/common';
import { BffModule } from './bff/bff.module';
import {ConfigModule} from '@nestjs/config';
import {BFF_ENV_FILE_PATH} from './app.constant';
import {rabbitMqOptions} from '../../config/rabbitmq.config';
import {validateEnvironments} from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: BFF_ENV_FILE_PATH,
      load: [rabbitMqOptions],
      validate: validateEnvironments,
    }),
    BffModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
