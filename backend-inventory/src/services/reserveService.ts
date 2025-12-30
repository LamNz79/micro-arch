import { ReserveStockRequestDto, ReserveStockResponseDto } from "@/dto/reserve-stock.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReserveService {
    reserve(body: ReserveStockRequestDto): ReserveStockResponseDto {
        if (body.quantity <= 0) return { reserved: false, reason: 'INVALID_STOCK' }
        const inStock = body.quantity <= 10;
        if (!inStock) return { reserved: false, reason: 'OUT_OF_STOCK' };
        return { reserved: true };
    }
}
