// CanActivate es una interfaz para implementar guardias de ruta
// ExecutionContext nos permite acceder a la solicitud HTTP
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
// JwtService para verificar tokens JWT
import { JwtService } from "@nestjs/jwt";
// Request es el tipo de solicitud HTTP de Express
import { Request } from "express";
import { jwtConstants } from "./constants/jwt.constant";

// @Injectable permite que este guardia sea inyectable
// CanActivate es una interfaz que todos los guardias deben implementar
@Injectable()
export class AuthGuard implements CanActivate {
  // Inyectamos el servicio JWT
  constructor(private readonly jwtService: JwtService) {}

  // Este método es llamado para verificar si el usuario puede acceder a una ruta protegida
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Obtenemos la solicitud HTTP del contexto
    const request = context.switchToHttp().getRequest();
    // Extraemos el token del encabezado Authorization
    const token = this.extractTokenFromHeader(request);

    // Si no hay token, rechazamos la solicitud
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verificamos y decodificamos el JWT usando la clave secreta
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // Adjuntamos el payload decodificado a la solicitud para usarlo en el controlador
      request.user = payload;
    } catch (error) {
      // Si el token es inválido o expirado, rechazamos la solicitud
      throw new UnauthorizedException();
    }

    // Si todo es válido, permitimos el acceso
    return true;
  }

  // Método privado que extrae el token del encabezado Authorization
  private extractTokenFromHeader(request: Request) {
    // El encabezado Authorization tiene el formato: "Bearer <token>"
    // Dividimos por espacio y tomamos el segundo elemento
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    // Retornamos el token solo si el tipo es "Bearer"
    return type === "Bearer" ? token : undefined;
  }
}