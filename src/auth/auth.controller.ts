// Importamos los decoradores necesarios de NestJS
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";

// Decorador que define la ruta base como /auth para todos los endpoints
@Controller("auth")
export class AuthController {
  // Inyectamos el servicio de autenticación
  constructor(private readonly authService: AuthService) {}

  // Endpoint POST /auth/register - Registra un nuevo usuario
  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    // Llama al servicio de autenticación para registrar el usuario
    return this.authService.register(registerDto);
  }

  // Endpoint POST /auth/login - Inicia sesión de un usuario
  // HttpCode especifica que la respuesta debe ser 200 OK en lugar de 201 Created
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    // Llama al servicio de autenticación para hacer login
    return this.authService.login(loginDto);
  }
}