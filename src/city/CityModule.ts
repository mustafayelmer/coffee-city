import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CityEntity, CitySchema} from "./CitySchema";
import {CityController} from "./CityController";
import {CityService} from "./CityService";

@Module({
    imports: [MongooseModule.forFeature([{ name: CityEntity.name, schema: CitySchema }])],
    controllers: [CityController],
    providers: [CityService],
})
export class CityModule {}