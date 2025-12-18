// @Injectable permite que este servicio sea inyectable en otros componentes
import { Injectable } from "@nestjs/common";
// InjectRepository permite inyectar el repositorio de TypeORM
import { InjectRepository } from "@nestjs/typeorm";
// Repository es el tipo que nos permite hacer operaciones en la base de datos
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

// @Injectable permite que este servicio sea inyectable
@Injectable()
export class UsersService {
  // Inyectamos el repositorio de Users para hacer operaciones en la base de datos
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  // Método para crear un nuevo usuario en la base de datos
  async create(createUserDto: CreateUserDto) {
    // Guardamos el nuevo usuario en la base de datos y retornamos el usuario creado
    return await this.usersRepository.save(createUserDto);
  }

  // Método para encontrar un usuario por su email
  async findOneByEmail(email: string) {
    // Buscamos un usuario con el email especificado en la base de datos
    return await this.usersRepository.findOneBy({ email });
  }
}