import { Module } from '@nestjs/common';
import { GatosService } from './gatos.service';
import { GatosController } from './gatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from './entities/gato.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([Gato])],
  controllers: [GatosController],
  providers: [GatosService],
})
export class GatosModule {}
