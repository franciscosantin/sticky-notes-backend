import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class ModificarNotaDTO {
    @ApiProperty({ example: 'Compras' })
    @IsString()
    @MaxLength(80)
    titulo?: string | null;

    @ApiProperty({ example: '' })
    @IsString()
    @MaxLength(250)
    body?: string | null;

    @ApiProperty({ example: 'red' })
    @IsString()
    @MaxLength(40)
    colorDeFondo?: string | null;

    @ApiProperty({ example: 2 })
    @IsString()
    @MaxLength(20)
    minutosDeValidez?: number | null;
}