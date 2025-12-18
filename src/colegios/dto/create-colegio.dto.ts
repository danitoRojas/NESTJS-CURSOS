import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateColegioDto {

    @IsString()
    nombre: string;

    
    @IsString()
    direccion: string;

    @IsNumber()
    capacidad: number;
}
