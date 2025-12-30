import { Module } from '@nestjs/common';
import { ReserveController } from 'src/reserve/reserve.controller';

@Module({
    controllers: [ReserveController],
})
export class ReserveModule { }
