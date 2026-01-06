import { InventoryController } from '@/controllers/inventory.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [InventoryController],
})
export class InventoryModule { }
