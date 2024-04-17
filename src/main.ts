import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan'
import rateLimit from 'express-rate-limit';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsFilter } from './utils/global.error.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter()
  // );
  app.use(morgan('combined'));
  // Global error handling
  app.useGlobalFilters(new AllExceptionsFilter()); 
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  // app.setGlobalPrefix('api');
  app.enableCors(); // Enable CORS if required
  app.enableShutdownHooks(); // Enable shutdown hooks if required

  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //     message: 'Too many requests, please try again later.',
  //     statusCode: 429,
  //     // trustProxy: true
  //   }),
  // );
  await app.listen(process.env.PORT);
} 

bootstrap();
