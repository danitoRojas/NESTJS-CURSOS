import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductoDto {


    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    nombre: string;
    
    @IsNumber({}, { message: 'El precio debe ser un número' })
    @IsPositive({ message: 'El precio debe ser un número positivo' })
    precio: number;


    @IsOptional()
    @IsString({ message: 'La descripcion debe ser una cadena de texto' })
    descripcion: string;
}
