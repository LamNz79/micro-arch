import { Module } from '@nestjs/common';
import { inventoryController } from 'src/inventory/inventory.controller';

@Module({
    controllers: [inventoryController],
})
export class inventoryModule { }
