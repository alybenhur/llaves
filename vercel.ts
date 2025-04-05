import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import serverless from 'serverless-http';

const server = async (event, context) => {
  const app = await NestFactory.create(AppModule);
  const handler = serverless(app.getHttpAdapter().getInstance());
  return handler(event, context);
};

export { server };
