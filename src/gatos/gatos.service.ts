import { Injectable } from '@nestjs/common';
import { CreateGatoDto } from './dto/create-gato.dto';
import { UpdateGatoDto } from './dto/update-gato.dto';
import { Gato } from './entities/gato.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GatosService {

  constructor(
    @InjectRepository(Gato)
    private gatoRepository: Repository<Gato>
  ) { }


  async create(createGatoDto: CreateGatoDto) {
    const gato = this.gatoRepository.create(createGatoDto);
    return await this.gatoRepository.save(gato);
  }

  async findAll() {
    return await this.gatoRepository.find();
  }

  async findOne(id: number) {
    return await this.gatoRepository.findOneBy({ id })
  }

  async update(id: number, updateGatoDto: UpdateGatoDto) {
    return await this.gatoRepository.update(id, updateGatoDto)
  }

  async remove(id: number) {
    return await this.gatoRepository.softDelete(id)
  }
}
