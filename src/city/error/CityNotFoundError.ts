import {HttpException, HttpStatus} from "@nestjs/common";

export class CityNotFoundError extends HttpException {
    constructor(value: string, key: string = 'id') {
        super(`City was not found with ${key}: ${value}`, HttpStatus.NOT_FOUND);
    }
}