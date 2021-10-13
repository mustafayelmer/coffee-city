import {CityController} from "../src/city/CityController";
import {CityService} from "../src/city/CityService";
import {CityDocument, CityEntity} from "../src/city/CitySchema";
import {CityDetail, CityMedium, CityShort, DeleteResponse} from "@yelmer-samples/coffee-shared";
import * as fs from "fs";
import * as mongoose from "mongoose";
import * as uuid from 'uuid';
import {CreateRequestDto} from "../src/city/dto/CreateRequestDto";

const _json = <T>(name: string): T => {
    const raw = fs.readFileSync(__dirname + `/data/${name}.json`);
    return JSON.parse(raw.toString()) as T;
}

/*describe('Application', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/foo-bar')
            .expect(404);
    });
});*/
describe('City', () => {
    let cityModel: mongoose.Model<CityDocument>;
    let cityService: CityService;
    let cityController: CityController;

    beforeEach(async () => {
        cityModel = {
            find() {
                return {};
            }
        } as mongoose.Model<CityDocument>;
        cityService = new CityService(cityModel);
        cityController = new CityController(cityService);
    });

    describe('listShort', () => {
        it('should return an array of cities', async () => {
            const body = _json<Array<CityShort>>('listShort.out');
            jest.spyOn(cityService, 'listShortAsync').mockImplementation(async () => body);
            expect(await cityController.listShortAsync()).toBe(body);
        });
    });
    describe('create', () => {
        it('should insert', async () => {
            const payload = _json<CreateRequestDto>('create.in');
            const body = _json<CityEntity>('create.out');

            jest.spyOn(cityService, 'createAsync').mockImplementation(async () => body);
            expect(await cityController.createAsync(payload)).toBe(body);
        });
    });
    describe('delete', () => {
        it('should delete', async () => {
            const id = uuid.v4();
            const body = {id} as DeleteResponse;

            jest.spyOn(cityService, 'deleteAsync').mockImplementation(async () => body);
            expect(await cityController.deleteAsync(id)).toBe(body);
        });
    });
    describe('listMedium', () => {
        it('should return an array of cities', async () => {
            const body = _json<Array<CityMedium>>('listMedium.out');
            jest.spyOn(cityService, 'listMediumAsync').mockImplementation(async () => body);
            expect(await cityController.listMediumAsync()).toBe(body);
        });
    });
    describe('detailByName', () => {
        it('should return detail of city', async () => {
            const body = _json<CityDetail>('detailByName.out');
            jest.spyOn(cityService, 'detailByNameAsync').mockImplementation(async () => body);
            expect(await cityController.detailByNameAsync('Amsterdam')).toBe(body);
        });
    });
    describe('listBasic', () => {
        it('should return an array of cities', async () => {
            const body = _json<Array<CityEntity>>('listBasic.out');
            jest.spyOn(cityService, 'listBasicAsync').mockImplementation(async () => body);
            expect(await cityController.listBasicAsync()).toBe(body);
        });
    });
});