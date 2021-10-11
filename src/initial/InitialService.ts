import {CityService} from "../city/CityService";

export class InitialService {
    static initialize(): void {
        setTimeout(() => {
            this._startAsync().then();
        }, 5000);
    }
    private static async _startAsync(): Promise<void> {
        await CityService.INS.createAsync({name: 'London'});
        await CityService.INS.createAsync({name: 'Berlin'});
        await CityService.INS.createAsync({name: 'Amsterdam'});
        await CityService.INS.createAsync({name: 'Paris'});
        await CityService.INS.createAsync({name: 'Roma'});
        console.log('Mock-up cities were added');
    }
}