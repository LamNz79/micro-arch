import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReserveModule } from '@/modules/reserve.module';
import { InventoryModule } from '@/modules/inventory.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { HealthModule } from '@/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 important
    }),
    InventoryModule,
    ReserveModule,
    PrismaModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
