import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 8001; // Usa 8001 si no hay variable de entorno
   await app.listen(port, '0.0.0.0'); // 
  //await app.listen(8001);
}
bootstrap();
