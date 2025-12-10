import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TareasService } from './tareas.service';
import type { Tarea } from './tareas.service';

@Controller('tareas')
export class TareasController {

    constructor(private tareasService: TareasService) { }

    @Get()
    geatTareas(): Tarea[] {
        return this.tareasService.getTareas();
    }

    @Post()
    createTarea(
        @Body() nuevaTarea: { titulo: string; estado: Tarea['estado'] }
    ): Tarea {
        return this.tareasService.crearTarea(nuevaTarea.titulo, nuevaTarea.estado);
    }

    @Get(':id')
    listarUnaTarea(@Param('id') id: number): Tarea | undefined {
        return this.tareasService.listarUnaTarea(Number(id));
    }

    @Put(':id')
    actualizarTarea(
        @Param('id') id: string,
        @Body() actualizarTarea: { titulo: string; estado: Tarea['estado'] }
    ): Tarea | undefined {
        return this.tareasService.actualizarTarea(Number(id), actualizarTarea.titulo, actualizarTarea.estado);
    }

    @Delete(':id')
    eliminarTarea(@Param('id') id: string): number | undefined {
        return this.tareasService.eliminarTarea(Number(id));
    }

}
