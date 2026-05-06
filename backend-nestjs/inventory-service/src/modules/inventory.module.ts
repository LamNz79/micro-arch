import { InventoryController } from '@/controllers/inventory.controller';
import { InventoryService } from '@/services/inventoryService';
import { Module } from '@nestjs/common';

@Module({
    controllers: [InventoryController],
    providers: [InventoryService],
})
export class InventoryModule { }
