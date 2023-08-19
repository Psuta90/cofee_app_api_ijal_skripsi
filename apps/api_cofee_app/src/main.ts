import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { cors } from 'config/cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(cors)
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks()

  await app.listen(3000);
}
bootstrap();
