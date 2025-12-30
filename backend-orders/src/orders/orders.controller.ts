import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { firstValueFrom, retry, timeout } from 'rxjs';
import {InventoryReserveRequest} from "@contracts/inventory.contract";

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
    const payload: InventoryReserveRequest = {
      productId: body.productId,
      quantity: body.quantity,
      orderRequestId: randomUUID()
    }
    const response = await firstValueFrom(
      this.http
        .post('http://backend-inventory:3002/reserve', payload)
        .pipe(
          timeout(2000),
          retry(1)
        )
    )
    if (!response.data.reserved) {
      return {
        status: 'RESERVED',
        reason: response.data.reason
      }
    }
    return {
      orderId: randomUUID(),
      status: 'CONFIRMED'
    }
  }
}
