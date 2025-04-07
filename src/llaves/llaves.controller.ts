import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,  Request } from '@nestjs/common';
import { LlavesService } from './llaves.service';
import { CreateLlaveDto } from './dto/create-llave.dto';
import { UpdateLlaveDto } from './dto/update-llave.dto';
import { LlaveDto } from './dto/llave.dto';
import { JwtAuthGuard } from '../guard/JwtAuthGuard';

@Controller('llaves')
export class LlavesController {
  constructor(private readonly llavesService: LlavesService) {}

  @Post()
  create(@Body() createLlaveDto: CreateLlaveDto) {
    return this.llavesService.create(createLlaveDto);
  }

  @Post('tomarllave')
  @UseGuards(JwtAuthGuard)
  reservar(@Body() LlaveDto: LlaveDto, @Request() req) {
    const user = req.user;
    return this.llavesService.reservar_desmarcar(LlaveDto,user);
  }

  @Get()
  findAll() {
    return this.llavesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.llavesService.findOne(id);
  }

  @Get('/codigo/:id')
  findOnedescripcion(@Param('id') id: string) {
      return this.llavesService.findCodigo(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLlaveDto: UpdateLlaveDto) {
    return this.llavesService.update(+id, updateLlaveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.llavesService.remove(id);
  }
}
