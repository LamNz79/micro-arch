import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Controller()
export class OrdersController {
  constructor(private readonly http: HttpService) { }
  @Get('health')
  health() {
    return { status: 'ok' }
  }

  @Post()
  async createOrder(
    @Body() body: { productId: string; quantity: number },
  ) {
    const response = await firstValueFrom(
      this.http.post('http://backend-inventory:3002/reserve', {
        producId: body.productId,
        quantity: body.quantity
      })
    )
    if (!response.data.reserved) {
      return {
        status: 'RESERVED',
        reason: response.data.reason
      }
    }
    return {
      orderId: randomUUID,
      status: 'CONFIRMED'
    }
  }
}
