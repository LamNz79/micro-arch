import { ReserveStockRequestDto, ReserveStockResponseDto } from '@/dto/reserve-stock.dto';
import { ReserveService } from '@/services/reserveService';
import { Body, Controller, Post } from '@nestjs/common';


@Controller('reserve')
export class ReserveController {
    constructor(
        private readonly reserveService: ReserveService
    ) { }
    @Post()
    reserve(@Body() body: ReserveStockRequestDto): ReserveStockResponseDto {
        return this.reserveService.reserve(body)
    }
}
