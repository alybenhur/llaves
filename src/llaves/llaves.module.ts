import { Module } from '@nestjs/common';
import { LlavesService } from './llaves.service';
import { LlavesController } from './llaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Llave } from './entities/llave.entity';
import { PrestamosModule } from 'src/prestamos/prestamos.module';
import { Prestamos } from 'src/prestamos/entities/prestamo.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Llave, Prestamos, Auth]),
      PrestamosModule
    ],
  controllers: [LlavesController],
  providers: [LlavesService],
})
export class LlavesModule {}
