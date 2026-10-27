import { mkdtemp, rm } from "node:fs/promises";
import { AppService } from "./app.service.js";
import { JsonDb } from "./database/json-db.js";
import { CrearNotaDTO } from "./dto/crear-nota.dto.js";
import { ModificarNotaDTO } from "./dto/modificar-nota.dto.js";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe('', () => {
    const previousDataFile = process.env.DATA_FILE;
    let directory: string = '';
    let serv: AppService;
    let db: JsonDb;
    beforeEach(async () => {
        db = new JsonDb();
        serv = new AppService(db);
        let directory = await mkdtemp(join(tmpdir(), 'test'));
        process.env.DATA_FILE = join(directory, 'db.json');
    })
    afterEach(async () => {
        if (previousDataFile === undefined) delete process.env.DATA_FILE;
        else process.env.DATA_FILE = previousDataFile;
        await rm(directory, { recursive: true, force: true });
    });
    it('crear una nota', async () => {
        let dto = <CrearNotaDTO>{
            titulo: 'Compras',
            body: 'ramen',
            colorDeFondo: 'brown',
            minutosDeValidez: 2
        };
        const nota = await serv.crearNota(dto);
        expect(nota.id).toEqual(expect.any(String));
        expect(nota.titulo).toBe('Compras');
        expect(serv.getNotas()).resolves.toEqual([nota]);
    })
    it('modificar una nota', async () => {
        let dto = <CrearNotaDTO>{
            titulo: 'Compras',
            body: 'ramen',
            colorDeFondo: 'brown',
            minutosDeValidez: 2
        };
        let modDto = <ModificarNotaDTO>{
            titulo: 'Mis compras'
        };
        let nota = await serv.crearNota(dto);
        nota = await serv.modificarNota(nota.id, modDto)
        expect(nota.id).toEqual(expect.any(String));
        expect(nota.titulo).toBe('Mis compras');
        expect(serv.getNotas()).resolves.toEqual([nota]);
    })
    it('eliminar una nota', async () => {
        let dto = <CrearNotaDTO>{
            titulo: 'Compras',
            body: 'ramen',
            colorDeFondo: 'brown',
            minutosDeValidez: 2
        };
        let nota = await serv.crearNota(dto);
        await serv.eliminarNota(nota.id)
        expect(serv.getNotas()).resolves.toEqual([]);
    })
});