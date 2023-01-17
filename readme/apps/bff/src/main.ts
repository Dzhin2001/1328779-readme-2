/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import {SERVICE_DEFAULT_PORT, SERVICE_DEFAULT_PREFIX_GLOBAL, SERVICE_DEFAULT_SWAGGER} from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('The «BFF» service')
    .setDescription('BFF service API')
    .setVersion('1.0')
    .build();

  const globalPrefix = SERVICE_DEFAULT_PREFIX_GLOBAL;
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SERVICE_DEFAULT_SWAGGER, app, document);

  const port = process.env.PORT || SERVICE_DEFAULT_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
