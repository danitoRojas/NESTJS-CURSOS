import { Injectable } from '@nestjs/common';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MateriasService {

  constructor(
    @InjectRepository(Materia) private materiasRepository: Repository<Materia>
  ){}

 async create(createMateriaDto: CreateMateriaDto) {
   const materia = this.materiasRepository.create(createMateriaDto)
   return await this.materiasRepository.save(materia);
  }

  findAll() {
    return `This action returns all materias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materia`;
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return `This action updates a #${id} materia`;
  }

  remove(id: number) {
    return `This action removes a #${id} materia`;
  }
}
