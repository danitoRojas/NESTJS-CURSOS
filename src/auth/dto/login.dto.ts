// Importamos Transform para transformar valores y validadores
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

// DTO (Data Transfer Object) para validar datos de login
// Los decoradores con @ hacen validación automática de tipos y formatos
export class LoginDto {
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