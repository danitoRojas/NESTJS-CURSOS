import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Gato {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombres: string

    @Column()
    raza:string

    @CreateDateColumn()
    creadoEn: Date


    @DeleteDateColumn()
    eliminadoEn: Date

}
