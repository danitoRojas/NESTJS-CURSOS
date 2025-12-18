import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Estudiante } from "../../estudiantes/entities/estudiante.entity";


@Entity()
export class Colegio {

    // Columna que funciona como clave primaria (Primary Key).
    @PrimaryGeneratedColumn()
    id: number;
    // Columna para almacenar el nombre del colegio/institución
    @Column()
    nombre: string;
    // Columna para almacenar la dirección física
    @Column()
    direccion: string; // ¡Corregido de 'direcion' a 'direccion'!
    // Columna para almacenar la capacidad máxima de estudiantes
    @Column()
    capacidad: number;

    // RELACIÓN UNO A MUCHOS (OneToMany):
    // - UN COLEGIO puede tener MUCHOS ESTUDIANTES
    // - Esta es la contraparte de la relación ManyToOne en Estudiante
    // - No crea ninguna columna en la tabla colegio (la clave foránea está en estudiante)
    // - El primer parámetro (() => Estudiante) define la entidad relacionada
    // - El segundo parámetro (estudiante => estudiante.colegio) referencia la propiedad en Estudiante
    // - El array [] indica que puede tener múltiples estudiantes
    @OneToMany(() => Estudiante, estudiante => estudiante.colegio)
    estudiantes: Estudiante[];

}
