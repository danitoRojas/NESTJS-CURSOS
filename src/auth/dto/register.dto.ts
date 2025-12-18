// Importamos Transform para transformar valores y validadores
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

// DTO (Data Transfer Object) para validar datos de registro
// Los decoradores con @ hacen validación automática de tipos y formatos
export class RegisterDto {
  // Validamos que sea un string no vacío
  @IsString()
  @MinLength(1)
  name: string;

  // Validamos que sea un email válido
  @IsEmail()
  email: string;

  // Validamos que sea un string con mínimo 6 caracteres
  // Transform elimina espacios en blanco al inicio y final
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}