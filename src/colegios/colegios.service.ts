import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { CreateColegioDto } from './dto/create-colegio.dto';
import { UpdateColegioDto } from './dto/update-colegio.dto';
import { Colegio } from './entities/colegio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColegiosService {

  constructor(@InjectRepository(Colegio) private readonly colegiosRepository: Repository<Colegio>){}


  async create(createColegioDto: CreateColegioDto) {
    const colegio = this.colegiosRepository.create(createColegioDto);
    return await this.colegiosRepository.save(colegio);
  }

  async findAll() {
    return await this.colegiosRepository.find();
  }

  async findOne(id: number) {
    // .findOne() = Busca UN colegio por ID
    // { where: { id } } = Condición WHERE id = id recibido
    // { relations: ['estudiantes'] } = EAGER LOADING: carga todos los estudiantes del colegio
    // Esto trae: { id, nombre, direccion, capacidad, estudiantes: [{...}, {...}] }
    return await this.colegiosRepository.findOne({
      where: { id },
      relations: ['estudiantes']  // Carga la relación OneToMany automáticamente
    });
  }

  async update(id: number, updateColegioDto: UpdateColegioDto) {
    return await this.colegiosRepository.update(id, updateColegioDto);
  }

  async remove(id: number) {
    return await this.colegiosRepository.softDelete(id);
  }
}
