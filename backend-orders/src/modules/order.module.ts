import { InventoryClient } from '@/clients/inventory.client';
import { OrdersController } from '@/orders/orders.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
    imports: [HttpModule],
    controllers: [OrdersController],
    providers: [InventoryClient]
})
export class OrdersModule { }
