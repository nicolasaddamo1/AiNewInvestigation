import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InferenceResponse } from '../interfaces/inference.interface';
import { InferenceResultDto } from '../dto/inference-result.dto';
import axios from 'axios';

@Injectable()
export class TradingService {
    constructor(private readonly configService: ConfigService) { }

    private get ROBOTFLOW_API_URL(): string {
        return this.configService.get<string>('ROBOTFLOW_API_URL');
    }

    private get ROBOTFLOW_API_KEY(): string {
        return this.configService.get<string>('ROBOTFLOW_API_KEY');
    }

    private get IMAGE_PATH(): string {
        return this.configService.get<string>('IMAGE_PATH');
    }

    async inferImage(imageBuffer: Buffer): Promise<InferenceResponse | null> {
        const imageBase64 = imageBuffer.toString('base64');
        try {
            const response = await axios({
                method: "POST",
                url: this.ROBOTFLOW_API_URL,
                params: {
                    api_key: this.ROBOTFLOW_API_KEY,
                },
                data: imageBase64,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al hacer inferencia:", error.message);
            return null;
        }
    }

    makeTradeDecision(prediction: string): string {
        if (prediction === "buy") {
            return "Señal de compra detectada.";
        } else if (prediction === "sell") {
            return "Señal de venta detectada.";
        } else {
            return "No se detectó una señal clara. Esperando...";
        }
    }

    async runBot(imageBuffer: Buffer): Promise<InferenceResultDto> {
        const inferenceResult = await this.inferImage(imageBuffer);
        if (!inferenceResult) {
            throw new Error("No se pudo obtener la inferencia.");
        }

        const prediction = inferenceResult.predictions[0]?.class;
        const decision = this.makeTradeDecision(prediction);

        return {
            predictions: inferenceResult.predictions,
            decision,
        };
    }
}