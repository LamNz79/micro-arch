import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryClient } from '@/clients/inventory.client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from '@/dto/create-order.dto';

@ApiTags('orders')
@Controller()
export class OrdersController {
  constructor(private readonly inventoryClient: InventoryClient) { }
  
  @Get('health')
  @ApiOperation({ summary: 'Check health status' })
  @ApiResponse({ status: 200, description: 'Health status' })
  health() {
    return { status: 'ok' }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created or rejected based on inventory.' })
  async createOrder(@Body() body: CreateOrderDto) {
    const result = await this.inventoryClient.reserveStock(
      body.productId,
      body.quantity
    );
    if (!result.reserved) return { status: 'REJECTED', reason: result.reason }
    return { status: 'CONFIRMED' }
  }
}