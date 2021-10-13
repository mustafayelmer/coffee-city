import {Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import {CityService} from "./CityService";
import {CreateRequestDto} from "./dto/CreateRequestDto";
import {CityEntity} from "./CitySchema";
import {ApiOperation, ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {CityDetail, CityMedium, CityShort, DeleteResponse, ErrorResponse} from "@yelmer-samples/coffee-shared";

@Controller('cities')
@ApiSecurity('apiKey')
export class CityController {
    constructor(private readonly cityService: CityService) {
    }

    @Get()
    @ApiOperation({ description: 'Lists cities with short info and ordered by name' })
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityShort, isArray: true})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    async listShortAsync(): Promise<Array<CityShort>> {
        return this.cityService.listShortAsync();
    }

    @Post()
    @ApiOperation({ description: 'Creates a city if name is valid and not-existed' })
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityEntity})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityNameError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.CONFLICT, description: 'CityDuplicatedError', type: ErrorResponse})
    async createAsync(@Body() dto: CreateRequestDto): Promise<CityEntity> {
        return await this.cityService.createAsync(dto);
    }

    @Delete(':id')
    @ApiOperation({ description: 'Deletes a city if existed' })
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: DeleteResponse})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityIdError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'CityNotFoundError', type: ErrorResponse})
    async deleteAsync(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResponse> {
        return this.cityService.deleteAsync(id);
    }

    @Get('weather')
    @ApiOperation({ description: 'Lists cities with detailed info and ordered by name' })
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityMedium, isArray: true})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    async listMediumAsync(): Promise<Array<CityMedium>> {
        return this.cityService.listMediumAsync();
    }

    @Get(':name/weather')
    @ApiOperation({ description: 'Fetches a city with detailed weather and historical weathers' })
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityDetail})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityNameError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'CityNotFoundError', type: ErrorResponse})
    async detailByNameAsync(@Param('name') name: string): Promise<CityDetail> {
        return this.cityService.detailByNameAsync(name);
    }

    @Get('m2m/list')
    @ApiOperation({ description: 'Lists cities with id and name, this endpoint is used by weather-microservice' })
    @ApiTags('City - M2M')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityEntity, isArray: true})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    async listBasicAsync(): Promise<Array<CityEntity>> {
        return this.cityService.listBasicAsync();
    }

    @Get('m2m/:id')
    @ApiOperation({ description: 'Fetches a city with id and name, this endpoint is used by weather-microservice, #todo' })
    @ApiTags('City - M2M')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityEntity})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityIdError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'CityNotFoundError', type: ErrorResponse})
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CityEntity> {
        return this.cityService.findByIdAsync(id);
    }
}