import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, Rol } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,  // Repositorio para interactuar con la base de datos
    private jwtService: JwtService,  // Servicio para generar JWT
  ) {}

  // Método para crear un nuevo usuario
  async register(body : CreateAuthDto): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(body.password, 10);  // Cifra la contraseña
    body.password = hashedPassword
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  // Método para validar el usuario
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;  // Si no existe el usuario, retornar null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);  // Comparar contraseñas

    if (!isPasswordValid) {
      return null;  // Si la contraseña no es válida, retornar null
    }

    return user;  // Si la contraseña es correcta, retornar el usuario
  }

  // Método para generar un JWT cuando el usuario se loguea
  async login(user: any) {
    const payload = { username: user.username, rol: user.rol, id : user.id };  // Payload del JWT
    return {
      access_token: this.jwtService.sign(payload),  // Genera el token JWT
    };
  }
}
