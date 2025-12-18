import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiante } from './entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegiosModule } from '../colegios/colegios.module';
import { Materia } from '../materias/entities/materia.entity';
import { MateriasModule } from '../materias/materias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante]), ColegiosModule ,MateriasModule],
  controllers: [EstudiantesController],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
