import { PartialType } from '@nestjs/mapped-types';
import { CreateGatoDto } from './create-gato.dto';
import { IsString } from "class-validator";
export class UpdateGatoDto extends PartialType(CreateGatoDto) {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    nombre: string;
    @IsString({ message: 'La raza debe ser una cadena de texto' })
    raza: string
}
