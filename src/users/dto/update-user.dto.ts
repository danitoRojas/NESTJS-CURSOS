// Importamos PartialType que hace que todos los campos sean opcionales
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// DTO para actualizar un usuario
// PartialType hace que todos los campos de CreateUserDto sean opcionales
// Esto permite actualizar solo los campos que se deseen cambiar
export class UpdateUserDto extends PartialType(CreateUserDto) {}
