import { Body, Controller, Post } from '@nestjs/common';
import type{InventoryReserveRequest, InventoryReserveResponse} from "@contracts/inventory.contract";

@Controller('reserve')
export class ReserveController {
    @Post()
    reserve(@Body() body: InventoryReserveRequest): InventoryReserveResponse {
        if (body.quantity > 5) {
            return {
                success: false,
                reason: 'OUT_OF_STOCK',
            };
        }
        return {
            success: true,
        };
    }
}
