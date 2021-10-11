import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CityModule} from "./city/CityModule";
import {SecurityMiddleware} from "./security/SecurityMiddleware";

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_CONNECTION),
        CityModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(SecurityMiddleware)
            .forRoutes('cities');
    }
}