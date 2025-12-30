import { Body, Controller, Post } from '@nestjs/common';

@Controller('reserve')
export class ReserveController {
    @Post()
    reserve(@Body() body: { productId: string; quantity: number }) {
        // TEMP logic (no DB yet)
        if (body.quantity <= 5) {
            return { reserved: true };
        }

        return {
            reserved: false,
            reason: 'OUT_OF_STOCK',
        };
    }
}
