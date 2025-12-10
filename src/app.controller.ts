import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  
  @Get('usuario/:nombre/:apellido')
  getUsuario(@Param('nombre') nombre: string, @Param('apellido') apellido: string): string {
  return this.appService.getUsuario(nombre, apellido);
} 

}
