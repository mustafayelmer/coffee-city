import {HttpException, HttpStatus} from "@nestjs/common";

export class CityDuplicatedError extends HttpException {
    constructor(name: string) {
        super(`City already existed with name: ${name}`, HttpStatus.CONFLICT);
    }
}