import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),  // Registra la entidad User en el módulo de autenticación
    JwtModule.register({
      secret: 'yourSecretKey',  // Clave secreta para firmar los tokens (cambia por algo más seguro)
      signOptions: { expiresIn: '60m' },  // Expiración del token (1 hora en este caso)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
