import { IsString, IsNotEmpty, IsNumber, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReserveStockRequestDto {
    @ApiProperty({ example: 'product-123', description: 'The ID of the product to reserve' })
    @IsString()
    @IsNotEmpty()
    readonly productId: string = '';

    @ApiProperty({ example: 10, description: 'The quantity to reserve' })
    @IsNumber()
    @IsNotEmpty()
    readonly quantity: number = 0;
}

export class ReserveStockResponseDto {
    @ApiProperty({ example: true, description: 'Whether the stock was reserved' })
    @IsBoolean()
    @IsNotEmpty()
    reserved!: boolean;

    @ApiProperty({ example: 'Not enough stock', description: 'The reason why reservation failed', required: false })
    @IsString()
    reason?: string;
}