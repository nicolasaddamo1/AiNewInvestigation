// src/buy/services/buy.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InferenceResponse } from '../interfaces/inference.interface';
import { InferenceResultDto } from '../dto/inference-result.dto';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class BuyService {
    constructor(private readonly configService: ConfigService) { }

    private get ROBOTFLOW_API_URL(): string {
        return this.configService.getOrThrow<string>('ROBOTFLOW_API_URL2');
    }

    private get ROBOTFLOW_API_KEY(): string {
        return this.configService.getOrThrow<string>('ROBOTFLOW_API_KEY2');
    }

    // Función para hacer inferencias con Roboflow
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

    // Función para procesar la inferencia
    async processInference(imageBuffer: Buffer): Promise<InferenceResultDto> {
        const inferenceResult = await this.inferImage(imageBuffer);
        if (!inferenceResult) {
            throw new Error("No se pudo obtener la inferencia.");
        }

        return {
            predictions: inferenceResult.predictions,
        };
    }
}