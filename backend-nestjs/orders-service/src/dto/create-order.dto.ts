import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'product-123', description: 'The ID of the product to order' })
  productId!: string;

  @ApiProperty({ example: 5, description: 'The quantity of the product' })
  quantity!: number;
}
