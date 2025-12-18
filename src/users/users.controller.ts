// Importamos los decoradores necesarios de NestJS
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Decorador que define la ruta base como /users para todos los endpoints
@Controller('users')
export class UsersController {
  // Inyectamos el servicio de usuarios
  constructor(private readonly usersService: UsersService) {}

  // Endpoint POST /users - Crea un nuevo usuario
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    // Llama al servicio para crear un nuevo usuario
    return this.usersService.create(createUserDto);
  }




  


}
