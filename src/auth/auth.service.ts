// Importamos las excepciones y decoradores necesarios
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";

// JwtService se usa para firmar y verificar tokens JWT
import { JwtService } from "@nestjs/jwt";
// bcryptjs se usa para hashear y comparar contraseñas de forma segura
import * as bcryptjs from "bcryptjs";

import { LoginDto } from "./dto/login.dto";
import { UsersService } from "../users/users.service";

// El decorador @Injectable() permite que este servicio sea inyectable en otros componentes
@Injectable()
export class AuthService {
  // Inyectamos el servicio de usuarios y el servicio JWT
  constructor(private readonly usersService: UsersService,
      private readonly jwtService: JwtService
  ) {}

  // Método para registrar un nuevo usuario
  async register({ password, email, name }: RegisterDto) {
    // Buscamos si el email ya existe en la base de datos
    const user = await this.usersService.findOneByEmail(email);

    // Si el usuario ya existe, lanzamos una excepción
    if (user) {
      throw new BadRequestException("Email already exists");
    }

    // Hasheamos la contraseña usando bcrypt con 10 rondas de encriptación
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Creamos el nuevo usuario en la base de datos con la contraseña hasheada
    await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    // Retornamos un mensaje de éxito
    return {
      message: "User created successfully",
    };
  }

 // Método para hacer login de un usuario
  async login({ email, password }: LoginDto) {
    // Buscamos el usuario por su email
    const user = await this.usersService.findOneByEmail(email);

    // Si el usuario no existe, lanzamos una excepción de no autorizado
    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }

    // Comparamos la contraseña ingresada con la contraseña hasheada almacenada
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    // Si la contraseña no es válida, lanzamos una excepción
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }

    // Creamos el payload que será codificado en el JWT (en este caso solo el email)
    const payload = { email: user.email };

    // Firmamos el JWT con el payload usando la clave secreta configurada
    const token = await this.jwtService.signAsync(payload);

    // Retornamos el token y el email del usuario
    return {
      token: token,
      email: user.email,
    };
  }
}