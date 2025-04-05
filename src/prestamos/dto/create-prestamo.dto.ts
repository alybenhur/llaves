// create-prestamo.dto.ts
import { IsInt, IsDate, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrestamoDto {
  @IsInt()
  @IsNotEmpty()
  usuario : number;  // El ID del usuario (relación con la entidad Auth)

  @IsInt()
  @IsNotEmpty()
  llave: number;  // El ID de la llave (relación con la entidad Llave)

  @IsDate()
  @IsOptional()
  @Type(() => Date) // Transformar a tipo Date
  fechaDevolucion: Date | null;  // Fecha de devolución (opcional)

  @IsDate()
  @IsOptional()
  @Type(() => Date) // Transformar a tipo Date
  fechaCreacion: Date = new Date();  // Fecha de creación, se asignará automáticamente la fecha actual
}