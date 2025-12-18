import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "../../estudiantes/entities/estudiante.entity";


@Entity()
export class Materia {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    nombre: string


    @ManyToMany(
        () => Estudiante,
        (estudiante) => estudiante.materias
    )
    estudiantes: Estudiante[];
}
