import 'tsconfig-paths/register'; // ← Add this FIRST
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  const config = new DocumentBuilder()
    .setTitle('Inventory Service')
    .setDescription('The Inventory Service API description')
    .setVersion('1.0')
    .addTag('inventory')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3002, '0.0.0.0');
}
bootstrap();