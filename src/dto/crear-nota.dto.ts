import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearNotaDTO {
    @ApiProperty({ example: 'Compras' })
    @IsString()
    @IsNotEmpty({ message: 'El título es obligatorio' })
    @MaxLength(80)
    titulo: string;

    @ApiProperty({})
    @IsString()
    @IsNotEmpty({ message: 'El body es obligatorio' })
    @MaxLength(250)
    body: string;

    @ApiProperty({ example: 'red' })
    @IsString()
    @IsNotEmpty({ message: 'El color de fondo es obligatorio' })
    @MaxLength(40)
    colorDeFondo: string;

    @ApiProperty({})
    @IsString()
    @IsNotEmpty({ message: 'Los minutos de validez son obligatorios' })
    @MaxLength(20)
    minutosDeValidez: number;
}