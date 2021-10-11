import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as uuid from 'uuid';

import {CityDocument, CityEntity} from "./CitySchema";
import {CreateRequestDto} from "./dto/CreateRequestDto";
import {CityNotFoundError} from "./error/CityNotFoundError";
import {InvalidCityIdError} from "./error/InvalidCityIdError";
import {InvalidCityNameError} from "./error/InvalidCityNameError";
import {CityDuplicatedError} from "./error/CityDuplicatedError";
import {WeatherService} from "../weather/WeatherService";
import {CityDetail, CityMedium, CityShort, DeleteResponse} from "@yelmer-samples/coffee-shared";

@Injectable()
export class CityService {
    private static _INS: CityService;

    constructor(
        @InjectModel(CityEntity.name) private readonly cityModel: Model<CityDocument>,
    ) {
        CityService._INS = this;
    }

    static get INS(): CityService {
        return this._INS;
    }

    private static _formatName(name: unknown): string {
        if (typeof name !== 'string') {
            throw new InvalidCityNameError('format', name);
        }
        const str: string = name.trim();
        if (str.search(/[\n\r\t]/) > 0) {
            throw new InvalidCityNameError('multi-line', name);
        }
        if (/<[a-z0-9\-][\s\S]*>/i.test(str)) {
            throw new InvalidCityNameError('html-tag', name);
        }
        return str;
    }

    private static _clearEntity(city: CityEntity): CityEntity {
        return {
            id: city.id,
            name: city.name,
        } as CityEntity;
    }

    async createAsync(dto: CreateRequestDto): Promise<CityEntity> {
        const city = new CityEntity();
        city.id = uuid.v4();
        city.name = CityService._formatName(dto?.name);

        const old = (await this.cityModel.findOne({name: city.name})) as CityEntity;
        if (old?.id) {
            throw new CityDuplicatedError(old.name);
        }
        const createdCity = new this.cityModel(city);
        await createdCity.save();
        await WeatherService.createAsync(city);
        return CityService._clearEntity(city);
    }

    async findByIdAsync(id: string): Promise<CityEntity> {
        if (!uuid.validate(id)) {
            throw new InvalidCityIdError(id);
        }
        const city = (await this.cityModel.findOne({id})) as CityEntity;
        if (!city?.id) {
            throw new CityNotFoundError(id);
        }
        return CityService._clearEntity(city);
    }

    async deleteAsync(id: string): Promise<DeleteResponse> {
        await this.findByIdAsync(id);
        await this.cityModel.deleteOne({id});
        await WeatherService.deleteAsync(id);
        return {id};
    }

    async detailByNameAsync(name: string): Promise<CityDetail> {
        name = CityService._formatName(name);
        const city = (await this.cityModel.findOne({name})) as CityEntity;
        if (!city?.id) {
            throw new CityNotFoundError(name, 'name');
        }
        const rec = new CityDetail();
        rec.id = city.id;
        rec.name = city.name;
        rec.latest = null;
        rec.history = [];
        const last = await WeatherService.findLastAsync(city.id);
        if (last?.doc?.id) {
            rec.latest = last.doc;
            const histories = await WeatherService.historyAsync(city.id, last.id);
            histories.forEach(history => {
                rec.history.push(history.doc);
            });
        }
        return rec;
    }

    async listShortAsync(): Promise<Array<CityShort>> {
        const cities = await this.cityModel.find();
        const cityMap: Record<string, CityShort> = {};
        cities.forEach(city => {
            const rec = new CityShort();
            rec.id = city.id;
            rec.name = city.name;
            rec.weather = null;
            cityMap[city.id] = rec;
        });
        const cityIds: Array<string> = cities.map(city => city.id);
        const weathers = await WeatherService.latestList(cityIds);
        weathers.forEach(weather => {
            if (cityMap[weather.city] != undefined) {
                cityMap[weather.city].weather = weather.doc.main;
            }
        });
        return Object.values(cityMap);
    }

    async listMediumAsync(): Promise<Array<CityMedium>> {
        const cities = await this.cityModel.find();
        const cityMap: Record<string, CityMedium> = {};
        cities.forEach(city => {
            const rec = new CityMedium();
            rec.id = city.id;
            rec.name = city.name;
            rec.weather = null;
            cityMap[city.id] = rec;
        });
        const cityIds: Array<string> = cities.map(city => city.id);
        const weathers = await WeatherService.latestList(cityIds);
        weathers.forEach(weather => {
            if (cityMap[weather.city] != undefined) {
                cityMap[weather.city].weather = weather.doc;
            }
        });
        return Object.values(cityMap);
    }

    async listBasicAsync(): Promise<Array<CityEntity>> {
        const cities = await this.cityModel.find();
        return cities.map(city => CityService._clearEntity(city));
    }

}