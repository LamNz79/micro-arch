import { ReserveStockRequestDto, ReserveStockResponseDto } from '@/dto/reserve-stock.dto';
import { ReserveService } from '@/services/reserveService';
import { ReserveStockSchema } from '@/validation/reserve-stock.schema';
import { Body, Controller, Post } from '@nestjs/common';


@Controller('reserve')
export class ReserveController {
    constructor(
        private readonly reserveService: ReserveService
    ) { }
    @Post()
    reserve(@Body() body: ReserveStockRequestDto): Promise<ReserveStockResponseDto> {
        const dto = ReserveStockSchema.parse(body)

        return this.reserveService.reserveStock(dto)
    }
}
