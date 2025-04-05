import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Rol } from '../entities/auth.entity'; // Asegúrate de que la ruta al enum sea correcta

export class CreateAuthDto {
  
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  apellido: string;

  @IsNotEmpty()
  @IsString()
  celular: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

   @IsOptional() // Indica que el rol es opcional en la creación, ya que tiene un valor por defecto
  @IsEnum(Rol)
  rol?: Rol;
}

