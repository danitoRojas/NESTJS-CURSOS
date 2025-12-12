import { IsString } from "class-validator";

export class CreateGatoDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    nombre: string;
    @IsString({ message: 'La raza debe ser una cadena de texto' })
    raza: string
}
