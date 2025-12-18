// Importamos los decoradores de TypeORM para definir las columnas de la tabla
import { Column, DeleteDateColumn, Entity } from "typeorm";

// @Entity marca esta clase como una entidad que será mapeada a una tabla en la base de datos
@Entity()
export class User {
  // ID: Columna principal con auto-incremento
  @Column({ primary: true, generated: true })
  id: number;

  // Nombre del usuario con máximo 500 caracteres
  @Column({ length: 500 })
  name: string;

  // Email del usuario: debe ser único y no puede ser nulo
  @Column({ unique: true, nullable: false })
  email: string;

  // Contraseña del usuario (hasheada): no puede ser nula
  @Column({ nullable: false })
  password: string;

  // Rol del usuario: por defecto es "user"
  @Column({ default: "user" })
  rol: string;

  // Fecha de eliminación lógica (soft delete)
  // Cuando se elimina un usuario, se guarda la fecha aquí en lugar de borrarlo realmente
  @DeleteDateColumn()
  deletedAt: Date;
}