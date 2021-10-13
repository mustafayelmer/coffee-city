import {CityService} from "../city/CityService";
import {Logger} from "@nestjs/common";

export class InitialService {
    private static readonly logger = new Logger(InitialService.name);
    static initialize(): void {
        setTimeout(() => {
            this._startAsync().then();
        }, 5000);
    }
    private static async _startAsync(): Promise<void> {
        try {
            await CityService.INS.createAsync({name: 'London'});
            await CityService.INS.createAsync({name: 'Berlin'});
            await CityService.INS.createAsync({name: 'Amsterdam'});
            await CityService.INS.createAsync({name: 'Paris'});
            await CityService.INS.createAsync({name: 'Roma'});
            this.logger.log('Mock-up cities were added');
        } catch (e) {
            this.logger.error(e.message);
        }
    }
}