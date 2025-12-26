import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { inventoryModule } from 'src/inventory.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
    }),
    inventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
