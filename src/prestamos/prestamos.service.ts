import { Injectable } from '@nestjs/common';
import { CreatePrestamoDto } from './dto/create-prestamo.dto';
import { UpdatePrestamoDto } from './dto/update-prestamo.dto';
import { Prestamos } from './entities/prestamo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PrestamosService {
  constructor(
   @InjectRepository(Prestamos)
      private readonly prestamosRepository: Repository<Prestamos>
    ) {}
    
  create(createPrestamoDto: CreatePrestamoDto) {
    
    return 'This action adds a new prestamo';
  }

  async getPrestamosActivos(): Promise<any> {
    return await this.prestamosRepository
      .createQueryBuilder('prestamos') // Alias para la tabla 'prestamos'
      .leftJoinAndSelect('prestamos.usuario', 'usuario') // Realiza el JOIN con la tabla 'auth' (usuario)
      .leftJoinAndSelect('prestamos.llave', 'llave') // Realiza el JOIN con la tabla 'llave'
      .where('prestamos.fechaDevolucion IS NULL') // Filtro para préstamos activos
      .select([
        'usuario.nombre',
        'usuario.apellido', // Seleccionar el nombre del usuario
        'usuario.celular', // Seleccionar el celular del usuario
        'llave.descripcion', // Seleccionar la descripción de la llave
      ])
      .getRawMany(); // Devuelve los resultados sin procesar, como un array de objetos planos
  }

  findAll() {
    return `This action returns all prestamos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prestamo`;
  }

  update(id: number, updatePrestamoDto: UpdatePrestamoDto) {
    return `This action updates a #${id} prestamo`;
  }

  remove(id: number) {
    return `This action removes a #${id} prestamo`;
  }
}
