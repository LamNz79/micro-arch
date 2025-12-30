import { ReserveController } from '@/controllers/reserve.controller';
import { ReserveService } from '@/services/reserveService';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ReserveController],
    providers: [ReserveService]
})
export class ReserveModule { }
