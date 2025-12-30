import { inventoryController } from '@/inventory/inventory.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [inventoryController],
})
export class InventoryModule { }
