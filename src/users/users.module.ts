// Importamos el decorador Module
import { Module } from "@nestjs/common";
// TypeOrmModule nos permite integrar TypeORM con NestJS
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

// @Module define las dependencias, controladores, servicios y exportaciones
@Module({
  // Configuramos TypeORM para usar la entidad User en este módulo
  imports: [TypeOrmModule.forFeature([User])],
  // Controladores de este módulo
  controllers: [UsersController],
  // Servicios de este módulo
  providers: [UsersService],
  // Exportamos UsersService para que otros módulos puedan usarlo
  exports: [UsersService],
})
export class UsersModule {}