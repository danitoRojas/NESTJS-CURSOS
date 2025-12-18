import { Module } from '@nestjs/common';
import { ColegiosService } from './colegios.service';
import { ColegiosController } from './colegios.controller';

import { Colegio } from './entities/colegio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Colegio])],
  controllers: [ColegiosController],
  providers: [ColegiosService],
  exports:[TypeOrmModule]
})
export class ColegiosModule {}
