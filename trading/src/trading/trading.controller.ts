import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TradingService } from './services/trading.service';
import { InferenceResultDto } from './dto/inference-result.dto';

@Controller('trading')
export class TradingController {
    constructor(private readonly tradingService: TradingService) { }

    @Post('send-image')
    @UseInterceptors(FileInterceptor('image'))
    async sendImage(@UploadedFile() file: Express.Multer.File): Promise<InferenceResultDto> {
        if (!file) {
            throw new Error("No se ha subido ninguna imagen.");
        }
        return this.tradingService.runBot(file.buffer);
    }
}