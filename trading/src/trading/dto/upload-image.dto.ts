import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadImageDto {
    @ApiProperty({ type: 'string', format: 'binary' }) // Para Swagger
    @IsNotEmpty()
    image: any; // El archivo de imagen
}