// src/buy/buy.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BuyService } from './services/buy.service';
import { BuyController } from './buy.controller';

@Module({
    imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
    controllers: [BuyController],
    providers: [BuyService],
})
export class BuyModule { }