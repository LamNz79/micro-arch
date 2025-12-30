import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class inventoryController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Post()
  create() {
    return {
      product: 'inventory-item',
      orderId: crypto.randomUUID(),
      status: 'PENDING',
    };
  }
}
