import { AppService } from "./app.service.js";
import { JsonDb } from "./database/json-db.js";
import { CrearNotaDTO } from "./dto/crear-nota.dto.js";
import { ModificarNotaDTO } from "./dto/modificar-nota.dto.js";
import { Nota } from "./entities/nota.entity.js";

describe('', () => {
    let serv: AppService;
    let db: JsonDb;
    beforeEach(() => {
        db = new JsonDb();
        serv = new AppService(db);
    })
    afterEach(() => {
        
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
        expect(await serv.getNotas()).resolves.toEqual([nota]);
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
        expect(await serv.getNotas()).resolves.toEqual([nota]);
    })
});