import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasModule } from './tareas/tareas.module';

import { ProductosModule } from './productos/productos.module';


@Module({
  imports: [TareasModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
