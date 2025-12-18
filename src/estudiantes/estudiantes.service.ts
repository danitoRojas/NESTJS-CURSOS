import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

import { Estudiante } from './entities/estudiante.entity';

import { Colegio } from '../colegios/entities/colegio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Materia } from '../materias/entities/materia.entity';

@Injectable()
export class EstudiantesService {

  // ============================================
  // CONSTRUCTOR - INYECCIÓN DE DEPENDENCIAS
  // ============================================
  // La inyección de dependencias es un patrón que permite que NestJS proporcione
  // automáticamente las dependencias que necesita el servicio (repositorios)
  constructor(
    // @InjectRepository(Estudiante) = Inyecta el repositorio de la tabla estudiante
    // Repository<Estudiante> = Tipo genérico que proporciona métodos CRUD (find, save, update, delete)
    @InjectRepository(Estudiante) private estudianteRepository: Repository<Estudiante>,
  
    // @InjectRepository(Colegio) = Inyecta el repositorio de la tabla colegio
    // Necesitamos este repositorio para validar que el colegio existe antes de crear/actualizar estudiantes
    // Nota: Está disponible porque en colegios.module.ts hacemos exports: [TypeOrmModule]
    @InjectRepository(Colegio) private colegioRepository: Repository<Colegio>,

    @InjectRepository(Materia) private materiasRepository: Repository<Materia>
  ){}


  // ============================================
  // CREATE - CREAR UN NUEVO ESTUDIANTE
  // ============================================
  // Este método crea un estudiante asociándolo a un colegio existente
  // Recibe un DTO (Data Transfer Object) con los datos del estudiante
  async create(createEstudianteDto: CreateEstudianteDto) {

    // PASO 1: VALIDAR QUE EL COLEGIO EXISTE
    // ====================================
    // createEstudianteDto.nombreColegio = Es el nombre del colegio que viene desde el cliente (JSON)
    // findOneBy() = Método de TypeORM que busca UN SOLO registro por condición
    // { nombre: ... } = Condición: busca en la tabla colegio donde nombre = nombreColegio del DTO
    // const colegio = el resultado será un objeto Colegio con su ID, o null si no existe
    const colegio = await this.colegioRepository.findOneBy({ nombre: createEstudianteDto.nombreColegio });

    // PASO 2: VALIDAR QUE EL RESULTADO NO SEA NULL
    // ============================================
    // if(!colegio) = Si el colegio es null o undefined (no existe)
    // throw new BadRequestException() = Lanzamos un error HTTP 400 Bad Request
    // Esto detiene la ejecución y responde al cliente que el colegio no existe
    if(!colegio){
      throw new BadRequestException('El colegio no existe');
    }

    let listaMaterias: Materia[] = []

    // Verificamos si el usuario envió IDs de materias en el JSON
    if (createEstudianteDto.materiasIds && createEstudianteDto.materiasIds.length > 0) {
      
      // .findBy() = Método que busca múltiples registros
      // { id: In(...) } = Sintaxis SQL "WHERE id IN ('id1', 'id2')"
      // Esto busca todas las materias de una sola vez en la base de datos
      listaMaterias = await this.materiasRepository.findBy({
        id: In(createEstudianteDto.materiasIds),
      });

      // Opcional: Validar si se encontraron todas las materias solicitadas
      if (listaMaterias.length !== createEstudianteDto.materiasIds.length) {
         // Podrías lanzar un warning o error si algún ID no existía
      }
    }
    // PASO 3: CREAR LA INSTANCIA DEL ESTUDIANTE EN MEMORIA
    // ==================================================
    // .create() = Método de TypeORM que PREPARA (pero NO guarda) un nuevo registro
    // ...createEstudianteDto = Spread operator: copia todos los campos del DTO
    //   (nombre, apellido, fechaNacimiento) al nuevo objeto estudiante
    // colegio = Agregamos el objeto colegio completo que obtuvimos en PASO 1
    // TypeORM automáticamente extraerá colegio.id y lo guardará en la columna FK 'colegioId'
    // materias = Array de entidades Materia que se asociarán al estudiante
    const estudiante = this.estudianteRepository.create(
        {
          ...createEstudianteDto,  // { nombre: "Juan", apellido: "Pérez", fechaNacimiento: "2005-03-15" }
          colegio,                  // { id: 1, nombre: "IED Técnico", ... }
          materias: listaMaterias   // Array de objetos Materia para la relación ManyToMany
        }
      );
    
    // PASO 4: GUARDAR EL ESTUDIANTE EN LA BASE DE DATOS
    // ================================================
    // .save() = Ejecuta el INSERT en la BD
    // Retorna el objeto estudiante completo guardado (incluyendo el ID generado)
    return await this.estudianteRepository.save(estudiante);
  }

  // ============================================
  // FIND ALL - OBTENER TODOS LOS ESTUDIANTES
  // ============================================
  // Retorna un array de TODOS los estudiantes con SOLO el nombre del colegio
  async findAll() {
    // .createQueryBuilder() = Permite construir consultas SQL más complejas
    // .leftJoinAndSelect() = JOIN con la tabla colegio para traer datos relacionados
    // .select() = Especifica EXACTAMENTE qué campos queremos (en vez de traer todos)
    // Solo traemos: id, nombre, apellido, fechaNacimiento del estudiante
    // Y SOLO el nombre del colegio (no id, direccion, capacidad del colegio)
    // También incluimos las materias asociadas al estudiante
    return await this.estudianteRepository
      .createQueryBuilder('estudiante')
      .leftJoinAndSelect('estudiante.colegio', 'colegio')
      .leftJoinAndSelect('estudiante.materias', 'materias')
      .select([
        'estudiante.id',
        'estudiante.nombre', 
        'estudiante.apellido',
        'estudiante.fechaNacimiento',
        'colegio.nombre',  // Solo el nombre del colegio
        'materias.id',     // ID de la materia
        'materias.nombre'  // Nombre de la materia
      ])
      .getMany();
  }

  // ============================================
  // FIND ONE - OBTENER UN ESTUDIANTE POR ID
  // ============================================
  // Busca un estudiante específico y retorna también su colegio relacionado
  async findOne(id: number) {
    // .findOne() = Método que busca UN SOLO registro con opciones avanzadas
    // { where: { id } } = Condición WHERE: busca donde id = id recibido
    // { relations: ['colegio', 'materias'] } = Carga el colegio y las materias asociadas
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },                      // WHERE id = ?
      relations: ['colegio', 'materias']  // INNER JOIN con colegio y materias
    });

    // VALIDACIÓN: Si el estudiante no existe (retorna null)
    // if (!estudiante) = Si el resultado es null o undefined
    // throw new BadRequestException() = Lanzar error HTTP 400 con mensaje
    if (!estudiante) {
      throw new BadRequestException(`Estudiante con ID ${id} no encontrado`);
    }

    // RETORNO: Si pasó la validación, devolvemos el estudiante con su colegio
    return estudiante;
  }

  // ============================================
  // UPDATE - ACTUALIZAR UN ESTUDIANTE
  // ============================================
  // Actualiza los datos del estudiante (nombre, apellido, fecha, colegio)
  // Usa .save() para retornar el objeto completo actualizado
  async update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    
    // PASO 1: OBTENER EL ESTUDIANTE ACTUAL DE LA BD
    // ===========================================
    // .findOneBy() = Busca UN registro por condición (más simple que .findOne)
    // { id } = Condición: WHERE id = id recibido como parámetro
    // const estudiante = almacena el objeto completo del estudiante (o null si no existe)
    const estudiante = await this.estudianteRepository.findOneBy({ id });

    // VALIDACIÓN: Si el estudiante no existe
    // if (!estudiante) = Si el resultado es null
    // throw = Lanzar error HTTP 400 antes de continuar
    if (!estudiante) {
      throw new BadRequestException(`Estudiante con ID ${id} no encontrado`);
    }

    // PASO 2: VALIDAR EL NUEVO COLEGIO (SI SE PROPORCIONA)
    // ===================================================
    // let colegio; = Declaramos variable sin inicializar (será null por defecto)
    // if (updateEstudianteDto.nombreColegio) = Si en el DTO viene un nombre de colegio nuevo
    let colegio;
    if (updateEstudianteDto.nombreColegio) {
      // Buscamos el colegio en la BD usando el nombre del DTO
      colegio = await this.colegioRepository.findOneBy({
        nombre: updateEstudianteDto.nombreColegio,  // Buscar colegio por nombre
      });

      // Si el colegio no existe, lanzar error
      if (!colegio) {
        throw new BadRequestException('El colegio no existe');
      }
      // Si llegamos aquí, colegio contiene el objeto del nuevo colegio
    }
    // Si NO había nombreColegio en el DTO, colegio sigue siendo undefined

    // PASO 2.5: VALIDAR Y ACTUALIZAR MATERIAS (SI SE PROPORCIONAN)
    // ===========================================================
    let listaMaterias: Materia[] | undefined;
    if (updateEstudianteDto.materiasIds && updateEstudianteDto.materiasIds.length > 0) {
      // Buscamos todas las materias enviadas en el DTO
      listaMaterias = await this.materiasRepository.findBy({
        id: In(updateEstudianteDto.materiasIds),
      });

      // Validación: verificar que todas las materias existen
      if (listaMaterias.length !== updateEstudianteDto.materiasIds.length) {
        throw new BadRequestException('Una o más materias no existen');
      }
    }

    // PASO 3: COMBINAR DATOS ANTIGUOS + NUEVOS + GUARDAR
    // ==================================================
    // .save() = Método que INSERTA si es nuevo o ACTUALIZA si ya existe (por ID)
    // { ...estudiante, ...updateEstudianteDto, colegio, materias }
    //   - ...estudiante = Expande todos los campos antiguos del estudiante
    //   - ...updateEstudianteDto = Sobrescribe con los nuevos valores del DTO
    //   - colegio = Actualiza la relación (o mantiene undefined si no cambió)
    //   - materias = Actualiza las materias asociadas (o mantiene undefined si no cambió)
    // Resultado: combina lo viejo con lo nuevo y guarda todo
    return await this.estudianteRepository.save({
      ...estudiante,            // { id: 1, nombre: "Juan", apellido: "Pérez", ... }
      ...updateEstudianteDto,   // { nombre: "Carlos" } <- sobrescribe nombre
      colegio,                  // { id: 2, nombre: "Nuevo Colegio" } o undefined
      materias: listaMaterias,  // Array de materias o undefined
    });
    // Retorna el estudiante COMPLETO actualizado
  }

  // ============================================
  // REMOVE - ELIMINAR UN ESTUDIANTE
  // ============================================
  // Utiliza SOFT DELETE: marca como eliminado pero no borra físicamente de la BD
  // Útil para mantener historiales, auditorías y referencia de datos
  async remove(id: number) {
    // PASO 1: VALIDAR QUE EL ESTUDIANTE EXISTE
    // ========================================
    // .findOneBy() = Busca el estudiante por su ID
    // Si no existe, retorna null
    const estudiante = await this.estudianteRepository.findOneBy({ id });

    // PASO 2: SI NO EXISTE, LANZAR ERROR
    // =================================
    // if (!estudiante) = Condición: si es null o undefined
    // throw = Lanzar error HTTP 400 y detener ejecución
    if (!estudiante) {
      throw new BadRequestException(`Estudiante con ID ${id} no encontrado`);
    }

    // PASO 3: REALIZAR SOFT DELETE
    // ============================
    // .softDelete() = Método de TypeORM que marca el registro como eliminado
    // NO BORRA la fila de la BD, solo actualiza una columna 'deletedAt' con la timestamp
    // Esto permite:
    //   - Recuperar datos eliminados si es necesario
    //   - Mantener integridad referencial
    //   - Auditar quién y cuándo eliminó
    // Cuando haces .find() después, automáticamente EXCLUYE registros soft-deleted
    return await this.estudianteRepository.softDelete(id);
  }
}
