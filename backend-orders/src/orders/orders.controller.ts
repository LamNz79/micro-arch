import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryClient } from '@/clients/inventory.client';

@Controller()
export class OrdersController {
  constructor(private readonly inventoryClient: InventoryClient) { }
  @Get('health')
  health() {
    return { status: 'ok' }
  }

  @Post()
  async createOrder(@Body() body: { productId: string; quantity: number }) {
    const result = await this.inventoryClient.reserveStock(
      body.productId,
      body.quantity
    );
    if (!result.reserved) return { status: 'REJECTED', reason: result.reason }
    return { status: 'CONFIRMED' }
  }
}
