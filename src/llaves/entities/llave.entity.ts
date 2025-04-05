import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from 'class-validator';
import { Prestamos } from "src/prestamos/entities/prestamo.entity";

export enum EstadoLlave {
    DISPONIBLE = 'disponible',
    NO_DISPONIBLE = 'no disponible',
  }

@Entity()
export class Llave{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    descripcion: string;
   
    @Column({
        type: 'enum',
        enum: EstadoLlave,
        default: EstadoLlave.DISPONIBLE,
      })
      estado: EstadoLlave;

      
      @Column()
      codigo: string;

      @OneToMany(() => Prestamos, (prestamo) => prestamo.llave)
      prestamos: Prestamos[];
}

