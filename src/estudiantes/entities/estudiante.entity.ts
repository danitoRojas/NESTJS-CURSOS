import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Colegio } from "../../colegios/entities/colegio.entity";
import { Materia } from "../../materias/entities/materia.entity";


@Entity()
export class Estudiante {


    // Columna que funciona como clave primaria (Primary Key) y se autogenera
    @PrimaryGeneratedColumn()
    id: number;
    // Columna para almacenar el nombre
    @Column()
    nombre: string;
    // Columna para almacenar el apellido
    @Column()
    apellido: string;
    // Columna para almacenar la fecha de nacimiento
    @Column()
    fechaNacimiento: Date;

    // RELACIÓN MUCHOS A UNO (ManyToOne):
    // - Muchos ESTUDIANTES pueden pertenecer a UN solo COLEGIO
    // - Esta relación crea automáticamente una columna 'colegioId' en la tabla estudiante
    // - El primer parámetro (() => Colegio) define la entidad relacionada
    // - El segundo parámetro (colegio => colegio.estudiantes) es la propiedad inversa en Colegio
    // - Esto permite que TypeORM maneje la relación bidireccional automáticamente
    @ManyToOne(() => Colegio, colegio => colegio.estudiantes)
    colegio: Colegio;


    // --- NUEVO: Relación Muchos a Muchos (Cursos) ---
    @ManyToMany(
        () => Materia,
        (materia) => materia.estudiantes,
        { cascade: true } // Permite guardar
    )
    @JoinTable() // <--- ¡OBLIGATORIO! Crea la tabla intermedia en la BD
    materias: Materia[];
}
