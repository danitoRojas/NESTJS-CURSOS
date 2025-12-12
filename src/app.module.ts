import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasModule } from './tareas/tareas.module';

import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatosModule } from './gatos/gatos.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    
    ConfigModule.forRoot({isGlobal: true}),

    TypeOrmModule.forRoot({
      type:"mysql",
      host:"localhost",
      port:3307,
      username:"user_crud",
      password:"root",
      database:"db_crud",
      autoLoadEntities:true,
      synchronize: true
    }),
    
    TareasModule, 
    ProductosModule, GatosModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
