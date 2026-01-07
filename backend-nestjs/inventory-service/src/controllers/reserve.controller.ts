import { ReserveStockRequestDto, ReserveStockResponseDto } from '@/dto/reserve-stock.dto';
import { ReserveService } from '@/services/reserveService';
import { ReserveStockSchema } from '@/validation/reserve-stock.schema';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('reserve')
@Controller('reserve')
export class ReserveController {
    constructor(
        private readonly reserveService: ReserveService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Reserve stock for a product' })
    @ApiResponse({ status: 201, description: 'Stock reservation processed', type: ReserveStockResponseDto })
    reserve(@Body() body: ReserveStockRequestDto): Promise<ReserveStockResponseDto> {
        const dto = ReserveStockSchema.parse(body)

        return this.reserveService.reserveStock(dto)
    }
}