import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class OrdersController {
  @Get('health')
  health() {
    return { status: 'ok' }
  }

  @Post()
  create() {
    return {
      product: 'order-item',
      orderId: crypto.randomUUID(),
      status: 'PENDING',
    };
  }
}
