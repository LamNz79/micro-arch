import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from 'src/orders/orders.controller';
import { OrdersModule } from 'src/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
    }),
    OrdersModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule { }
