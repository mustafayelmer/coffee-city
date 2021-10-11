import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import {City} from "@yelmer-samples/coffee-shared";

@Schema({collection: 'city'})
export class CityEntity implements City {
    @Prop()
    @ApiProperty({description: 'City id', type: String, format: 'uuid'})
    id: string;

    @Prop()
    @ApiProperty({description: 'City name', type: String})
    name: string;
}

export const CitySchema = SchemaFactory.createForClass(CityEntity);
export type CityDocument = CityEntity & Document;
