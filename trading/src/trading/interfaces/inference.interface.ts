export interface InferenceResponse {
    predictions: Array<{
        class: string;
        confidence: number;
        bbox: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>;
}