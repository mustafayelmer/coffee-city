import axios, {AxiosResponse} from "axios";
import {City, Weather} from "@yelmer-samples/coffee-shared";
import {WeatherProviderError} from "./error/WeatherProviderError";

type AxiosLambda<T> = () => Promise<AxiosResponse<T>>;
// noinspection JSUnusedGlobalSymbols
export class WeatherService {
    static readonly URL = 'http://weather:8091/v1/weathers';

    private static get _header(): Record<string, string> {
        return {
            'x-api-key': process.env.WEATHER_API_KEY,
        }
    }
    private static async _runAsync<T>(name: string, fnc: AxiosLambda<T>): Promise<T> {
        let content: AxiosResponse<T> = null;
        try {
            content = await fnc();
        } catch (e) {
            throw new WeatherProviderError(name, e?.message ?? 'Unknown error');
        }
        if (!content?.data) {
            throw new WeatherProviderError(name, 'Content not found');
        }
        return content.data;

    }
    static async createAsync(city: City): Promise<Weather> {
        return await this._runAsync<Weather>('create', async () => {
            return await axios.post(`${this.URL}`, city, {headers: this._header});
        });
    }

    static async deleteAsync(cityId: string): Promise<void> {
        return await this._runAsync<void>('delete', async () => {
            return await axios.delete(`${this.URL}/${cityId}`, {headers: this._header});
        });
    }

    static async findLastAsync(cityId: string): Promise<Weather> {
        return await this._runAsync<Weather>('get', async () => {
            return await axios.get(`${this.URL}/${cityId}/last`, {headers: this._header});
        });
    }

    static async historyAsync(cityId: string, id: string): Promise<Array<Weather>> {
        return await this._runAsync<Array<Weather>>('history', async () => {
            return await axios.get(`${this.URL}/${cityId}/history/${id}`, {headers: this._header});
        });
    }

    static async latestList(cityIds: Array<string>): Promise<Array<Weather>> {
        return await this._runAsync<Array<Weather>>('history', async () => {
            return await axios.post(`${this.URL}/latest-list`, cityIds, {headers: this._header});
        });
    }

}