import 'tsconfig-paths/register'; // ← Add this FIRST
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3002;
  Logger.log(`Server running on port ${port}`, 'Bootstrap');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(port, '0.0.0.0');
}
bootstrap();
