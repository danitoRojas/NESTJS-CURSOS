// Importamos el decorador Module de NestJS
import { Module } from "@nestjs/common";
// JwtModule se usa para configurar la funcionalidad de JWT en toda la aplicación
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants/jwt.constant";
import { UsersModule } from "../users/users.module";

// El decorador @Module define este módulo y sus dependencias
@Module({
  // imports: módulos que este módulo necesita
  imports: [
    // Importamos el módulo de usuarios para poder usar UsersService
    UsersModule,
    // Configuramos JWT de forma global para toda la aplicación
    JwtModule.register({
      global: true, // Hace que JWT esté disponible en toda la aplicación
      secret: jwtConstants.secret, // La clave secreta para firmar los tokens
      signOptions: { expiresIn: "1d" }, // El token expira en 1 día
    }),
  ],
  // controllers: Los controladores de este módulo
  controllers: [AuthController],
  // providers: Los servicios de este módulo
  providers: [AuthService],
})
export class AuthModule {}