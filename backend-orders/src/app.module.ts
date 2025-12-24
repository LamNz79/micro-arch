import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from 'src/orders/orders.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
    }),
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule { }
