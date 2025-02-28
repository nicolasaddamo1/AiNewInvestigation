import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradingModule } from './trading/trading.module';
import { ConfigModule } from '@nestjs/config';
import { BuyModule } from './buy/buy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TradingModule,
    BuyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
