import { IsArray, IsDateString, IsOptional, IsString } from "class-validator"

export class CreateEstudianteDto {

    @IsString()
    nombre: string

    @IsString()
    apellido: string

    @IsDateString()
    fechaNacimiento: Date

    @IsString()
    nombreColegio: string


    // --- NUEVO CAMPO ---
    @IsOptional()
    @IsArray()
    materiasIds?: string[];
}
