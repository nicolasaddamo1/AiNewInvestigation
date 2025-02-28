// src/buy/buy.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BuyService } from './services/buy.service';
import { InferenceResultDto } from './dto/inference-result.dto';

@Controller('buy')
export class BuyController {
    constructor(private readonly buyService: BuyService) { }

    @Post('infer-image')
    @UseInterceptors(FileInterceptor('image'))
    async inferImage(@UploadedFile() file: Express.Multer.File): Promise<InferenceResultDto> {
        if (!file) {
            throw new Error("No se ha subido ninguna imagen.");
        }
        return this.buyService.processInference(file.buffer);
    }
}