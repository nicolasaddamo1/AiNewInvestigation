import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
    @IsNotEmpty()
    image: any; // El archivo de imagen
}