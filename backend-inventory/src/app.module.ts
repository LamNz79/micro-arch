import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ReserveModule } from '@/modules/reserve.module';
import { InventoryModule } from '@/modules/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
    }),
    InventoryModule,
    ReserveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
