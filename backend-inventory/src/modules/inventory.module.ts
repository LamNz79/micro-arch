import { inventoryController } from '@/controllers/inventory.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [inventoryController],
})
export class InventoryModule { }
