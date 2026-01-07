import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('inventory')
@Controller()
export class InventoryController {
  @Get('health')
  @ApiOperation({ summary: 'Check health status' })
  @ApiResponse({ status: 200, description: 'Health status' })
  health() {
    return { status: 'ok' };
  }

  @Post()
  @ApiOperation({ summary: 'Create inventory item' })
  @ApiResponse({ status: 201, description: 'The inventory item has been successfully created.' })
  create() {
    return {
      product: 'inventory-item',
      orderId: crypto.randomUUID(),
      status: 'PENDING',
    };
  }
}