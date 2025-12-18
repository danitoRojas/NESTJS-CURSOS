// DTO (Data Transfer Object) para transferir datos de creación de usuario
// Define los campos que se requieren para crear un nuevo usuario
export class CreateUserDto {
  // Nombre del usuario
  name: string;
  // Email del usuario
  email: string;
  // Contraseña del usuario (será hasheada en el servicio de autenticación)
  password: string;
}