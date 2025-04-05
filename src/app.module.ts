import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';
import { LlavesModule } from './llaves/llaves.module';
import { Llave } from './llaves/entities/llave.entity';
import { PrestamosModule } from './prestamos/prestamos.module';
import { Prestamos } from './prestamos/entities/prestamo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',  // Configuración de MySQL
      host: '44.197.93.57',  // Cambia por el host de tu base de datos
      port: 3306,  // Puerto de MySQL
      username: 'aly',  // Tu nombre de usuario
      password: 'Alyben@1234',  // Tu contraseña de base de datos
      database: 'llaves',  // Nombre de la base de datos
      entities: [Auth,Llave,Prestamos],
      synchronize: true,  // Cuidado con esto en producción, puede borrar tablas.
    }),
    AuthModule,
    LlavesModule,
    PrestamosModule,  // Módulo de autenticación
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
