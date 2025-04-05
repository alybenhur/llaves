import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLlaveDto } from './dto/create-llave.dto';
import { UpdateLlaveDto } from './dto/update-llave.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoLlave, Llave } from './entities/llave.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; 
import { LlaveDto } from './dto/llave.dto';
import { PrestamosService } from 'src/prestamos/prestamos.service';
import { Prestamos } from 'src/prestamos/entities/prestamo.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Injectable()
export class LlavesService {
  constructor(
    @InjectRepository(Llave)
    private readonly llaveRepository: Repository<Llave>,
   
    @InjectRepository(Prestamos)
    private readonly prestamosRepository: Repository<Prestamos>,

    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>
   
  ) {}
  
  generateUniqueCode(): string {
    return uuidv4(); // Devuelve un UUID único
  }

  async reservar_desmarcar(LlaveDto: LlaveDto, user: any) {
    let enc =  await this.findCodigo(LlaveDto.codigo) 
    if (!enc) {
      throw new Error('Codigo de llave no existe'); // Si no se encuentra el registro
    }

    let rol = user.rol
    if (rol == 'instructor')
      { 
        if (enc.estado == EstadoLlave.DISPONIBLE)
         {
          const usuario = await this.authRepository.findOne({ where: { id: user.id } });
          enc.estado = EstadoLlave.NO_DISPONIBLE;
          this.llaveRepository.save(enc);
          
          const prestamo = new Prestamos();
          prestamo.llave = enc
          prestamo.usuario = usuario
          prestamo.fechaCreacion = new Date(); // Fecha actual
          prestamo.fechaDevolucion = null; // Fecha de devolución aún no definida (opcional)
          await this.prestamosRepository.save(prestamo);
         
          
          return {
            "descripcion": "Llave reservada con exito.",
           }
         }
        else{
          return {
             "descripcion": "La Llave no esta disponible.",
          }
        }
      }
    else
     {
      if (rol == 'admin')
      {
        if (enc.estado == EstadoLlave.NO_DISPONIBLE){
          enc.estado = EstadoLlave.DISPONIBLE;
          this.llaveRepository.save(enc);
          
          const prestamo = await this.prestamosRepository.findOne({
            where: {
              llave: { id: enc.id },
              fechaDevolucion: null, // Solo seleccionamos los préstamos sin fecha de devolución
            },
            relations: ['llave', 'usuario'], // Cargar las relaciones de llave y usuario
          });
          
          prestamo.fechaDevolucion = new Date(); // Fecha actual
          await this.prestamosRepository.save(prestamo);
          return {
            "descripcion": "Llave entregada con exito.",
           }
        }
        else{
          return {
            "descripcion": "No se puede recibir una llave que no esta prestada.",
           }
        }
      }
     }  
    }

  async create(createLlaveDto: CreateLlaveDto) {
   
    let enc =  await this.findOne(createLlaveDto.descripcion)
    console.log(enc)
     if (!enc)
       {
        createLlaveDto.codigo = this.generateUniqueCode()
        const llave = this.llaveRepository.create(createLlaveDto); // Usamos el DTO para crear la entidad
        return this.llaveRepository.save(llave);
       }
      return "Ya existe una llave con esa descripcion" 
   }
  

  async findAll(): Promise<Llave[]> {
    return this.llaveRepository.find();
  }


  async findOne(descripcion: string): Promise<Llave> {
    const llave = await this.llaveRepository.findOne({
      where: { descripcion }, // Usa un objeto con la propiedad `where`
    });

    if (!llave) {
      return null
    }
    return llave;
  }

  async findCodigo(codigo: string) {
    const llave = await this.llaveRepository.findOne({
      where: { codigo }, // Usa un objeto con la propiedad `where`
    });

    if (!llave) {
      throw new NotFoundException(`Llave con ID ${codigo} no encontrada`);
    }
    console.log(llave)
    return llave;
  }


  update(id: number, updateLlaveDto: UpdateLlaveDto) {
    return `This action updates a #${id} llave`;
  }

  async remove(id: string): Promise<void> {
    const llave = await this.findOne(id); // Buscar la llave primero
    await this.llaveRepository.remove(llave); // Eliminar la llave
  }
}
