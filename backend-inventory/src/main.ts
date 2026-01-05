import 'tsconfig-paths/register'; // ← Add this FIRST
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT);

  await app.listen(process.env.PORT ?? 3002, '0.0.0.0');
}
bootstrap();
