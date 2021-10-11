import {HttpException, HttpStatus} from "@nestjs/common";

export class InvalidCityNameError extends HttpException {
    constructor(type: string, value: unknown) {
        super(`City name is not valid[${type}] with value: ${JSON.stringify(value)}!`, HttpStatus.NOT_ACCEPTABLE);
    }
}