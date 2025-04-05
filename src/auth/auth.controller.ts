import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 // Ruta para registrar un nuevo usuario
 @Post('register')
 async register(@Body() body: CreateAuthDto) {
   return this.authService.register(body);
 }

 // Ruta para loguear un usuario y generar un JWT
 @Post('login')
 async login(@Body() body: { username: string, password: string }) {
   
   const user = await this.authService.validateUser(body.username, body.password);
   
   if (!user) {
     throw new Error('Invalid credentials');
   }let r = this.authService.login(user); 
  
   return r
 }
}
