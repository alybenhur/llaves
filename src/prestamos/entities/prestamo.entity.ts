import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Auth } from '../../auth/entities/auth.entity'
import { Llave } from '../../llaves/entities/llave.entity';



   
@Entity()
export class Prestamos {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con Usuario
  @ManyToOne(() => Auth, (usuario) => usuario.prestamos)
  @JoinColumn({ name: 'usuario_id' }) // Aquí indicamos la columna que será la clave foránea
  usuario: Auth;

  // Relación con Llaves
  @ManyToOne(() => Llave, (llave) => llave.prestamos)
  @JoinColumn({ name: 'llave_id' }) // Aquí indicamos la columna que será la clave foránea
  llave: Llave;

  // Fecha y hora de creación
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  // Fecha de devolución
  @Column({ type: 'timestamp', nullable: true })
  fechaDevolucion: Date | null;
}

