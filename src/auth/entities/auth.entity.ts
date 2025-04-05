import { Prestamos } from "src/prestamos/entities/prestamo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Rol {
    ADMIN = 'admin',
    INSTRUCTOR = 'instructor',
  }

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nombre: string;

    @Column()
    apellido: string;
  
    @Column()
    celular: string;

    @Column()
    username: string;

    @Column()
    password: string;  // Almacena la contraseña en texto cifrado

    @Column({
            type: 'enum',
            enum: Rol,
            default: Rol.INSTRUCTOR,
          })
          rol: Rol;

   

    @OneToMany(() => Prestamos, (prestamo) => prestamo.usuario)
          prestamos: Prestamos[];
}
