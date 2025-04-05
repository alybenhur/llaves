import { IsString,  IsNotEmpty } from 'class-validator';
import { EstadoLlave } from '../entities/llave.entity'; // Importa el enum de EstadoLlave
export class LlaveDto {
  @IsNotEmpty()
  @IsString()
  codigo: string;
}