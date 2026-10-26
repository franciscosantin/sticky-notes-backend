import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CrearNotaDTO } from './dto/crear-nota.dto.js';
import { ModificarNotaDTO } from './dto/modificar-nota.dto.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notas')
@Controller('notas')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getNotas(): Promise<string> {
    return JSON.stringify(await this.appService.getNotas())
  }

  @Post()
  async crearNota(@Body() dto: CrearNotaDTO): Promise<string> {
    return JSON.stringify(await this.appService.crearNota(dto));
  }

  @Patch(':id')
  async updateNota(@Param('id', ParseUUIDPipe) id: string, @Body() dto: ModificarNotaDTO): Promise<string> {
    return JSON.stringify(await this.appService.modificarNota(id, dto));
  }

  @Delete(':id')
  async borrarNota(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return JSON.stringify(await this.appService.eliminarNota(id));
  }
}
