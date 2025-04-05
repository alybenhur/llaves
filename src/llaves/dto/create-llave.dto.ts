import { IsString, IsEnum, IsOptional } from 'class-validator';
import { EstadoLlave } from '../entities/llave.entity'; // Importa el enum de EstadoLlave

export class CreateLlaveDto {
  @IsString()
  descripcion: string;

  @IsEnum(EstadoLlave)
  @IsOptional() // Lo hacemos opcional para que no sea obligatorio enviarlo en la creación
  estado?: EstadoLlave;

  @IsOptional()
  codigo: string;
}