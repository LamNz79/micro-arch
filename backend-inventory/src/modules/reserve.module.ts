import { ReserveController } from '@/reserve/reserve.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [ReserveController],
})
export class ReserveModule { }
