import { Injectable } from '@nestjs/common';
import { DatabaseFile, JsonDb } from './database/json-db.js';
import { Nota } from './entities/nota.entity.js';
import { CrearNotaDTO } from './dto/crear-nota.dto.js';
import { ModificarNotaDTO } from './dto/modificar-nota.dto.js';
import { randomUUID } from 'crypto';

@Injectable()
export class AppService {
  constructor(private readonly db: JsonDb) {}

  async getNotas(): Promise<Nota[]> {
    let dbFile: DatabaseFile = await this.db.read();
    return dbFile.notas;
  }

  async crearNota(dto: CrearNotaDTO): Promise<Nota> {
    return await this.db.update((dbFile) => {
      let ct = new Date();

      const id = randomUUID();

      let nueva: Nota = {
          id: id,
          titulo: dto.titulo,
          body: dto.body,
          colorDeFondo: dto.colorDeFondo,
          validoHasta: (new Date(ct.getTime() + dto.minutosDeValidez * 60 * 1000)).toISOString(),
          creadoEn: ct.toISOString(),
      };
      dbFile.notas.push(nueva);
      return nueva;
    });
  }

  async modificarNota(id: string, dto: ModificarNotaDTO): Promise<Nota> {
    return await this.db.update((dbFile) => {
      let ct = new Date();

      let i = dbFile.notas.findIndex((e) => e.id == id);
      let old = dbFile.notas[i];
      let nueva: Nota = {
          id: id,
          titulo: dto.titulo ?? old.titulo,
          body: dto.body ?? old.body,
          colorDeFondo: dto.colorDeFondo ?? old.colorDeFondo,
          validoHasta: dto.minutosDeValidez != null ? (new Date(ct.getTime() + dto.minutosDeValidez * 60 * 1000)).toISOString() : old.validoHasta,
          creadoEn: old.creadoEn,
      };
      dbFile.notas[i] = nueva;
      return nueva
    });
  }

  async eliminarNota(id: string): Promise<void> {
    await this.db.update<void>((dbFile) => {
      let i = dbFile.notas.findIndex((e) => e.id == id);
      dbFile.notas.splice(i, 1);
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
