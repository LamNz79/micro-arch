import { Controller, Get, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('health')
  health() {
    return { status: 'ok' }
  }

  @Post()
  create() {
    return {
      orderId: crypto.randomUUID(),
      status: 'PENDING',
    };
  }
}
