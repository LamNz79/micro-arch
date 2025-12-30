import { ReserveStockRequestDto, ReserveStockResponseDto } from '@/dto/reserve-stock.dto';
import { Body, Controller, Post } from '@nestjs/common';


@Controller('reserve')
export class ReserveController {
    @Post()
    reserve(@Body() body: ReserveStockRequestDto): ReserveStockResponseDto {
        if (body.quantity <= 0) return { reserved: false, reason: 'INVALID_STOCK' }
        const inStock = body.quantity <= 10;
        if (!inStock) return { reserved: false, reason: 'OUT_OF_STOCK' };
        return { reserved: true };
    }
}
