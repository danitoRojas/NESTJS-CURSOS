import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

// RUTAS BASE: localhost:3000/estudiantes
@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  // POST /estudiantes - CREAR un nuevo estudiante
  // Body esperado: { nombre, apellido, fechaNacimiento, nombreColegio }
  @Post()
  async create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return await this.estudiantesService.create(createEstudianteDto);
  }

  // GET /estudiantes - OBTENER todos los estudiantes con sus colegios
  // Retorna array de estudiantes con relación al colegio
  @Get()
  async findAll() {
    return await this.estudiantesService.findAll();
  }

  // GET /estudiantes/:id - OBTENER un estudiante específico por ID
  // Retorna estudiante con su colegio relacionado
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.estudiantesService.findOne(+id);
  }

  // PATCH /estudiantes/:id - ACTUALIZAR un estudiante
  // Body: puede incluir nombre, apellido, fechaNacimiento, nombreColegio
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto) {
    return await this.estudiantesService.update(+id, updateEstudianteDto);
  }

  // DELETE /estudiantes/:id - ELIMINAR un estudiante (soft delete)
  // No borra físicamente, solo marca como eliminado
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.estudiantesService.remove(+id);
  }
}
