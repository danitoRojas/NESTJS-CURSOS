import { Injectable } from '@nestjs/common';


export interface Tarea {
    id: number;
    titulo: string;
    estado: 'pendiente' | 'completada';
}


@Injectable()
export class TareasService {

    private tareas: Tarea[] = [
        { id: 1, titulo: 'Tarea 1', estado: 'pendiente' },
    ];


    getTareas(): Tarea[] {
        return this.tareas;
    }

    ;
    crearTarea(titulo: string, estado: Tarea['estado']): Tarea {

        const nuevaTarea: Tarea = {
            id: new Date().getTime(),
            titulo,
            estado,
        };

        this.tareas.push(nuevaTarea);
        return nuevaTarea;
    }


    listarUnaTarea(id: number): Tarea | undefined {
        return this.tareas.find(tarea => tarea.id === id);
        
    }


    actualizarTarea(id: number , titulo: string, estado: Tarea['estado']): Tarea | undefined {
        const tarea = this.tareas.find(tarea => tarea.id === id);
        if (tarea) {
            tarea.titulo = titulo;
            tarea.estado = estado;
        }
        return tarea;
    }

    eliminarTarea(id: number): number | undefined {
        const tarea = this.tareas.find(tarea => tarea.id === id);
        if (tarea) {
            this.tareas = this.tareas.filter(tarea => tarea.id !== id);
            return id;
        }
        return undefined;
    }
}