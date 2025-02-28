import { Module } from '@nestjs/common';
import { TradingService } from './services/trading.service';
import { TradingController } from './trading.controller';

@Module({
    controllers: [TradingController],
    providers: [TradingService],
})
export class TradingModule { }