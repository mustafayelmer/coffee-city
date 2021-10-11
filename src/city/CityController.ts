import {Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import {CityService} from "./CityService";
import {CreateRequestDto} from "./dto/CreateRequestDto";
import {CityEntity} from "./CitySchema";
import {ApiResponse, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {CityDetail, CityMedium, CityShort, DeleteResponse, ErrorResponse} from "@yelmer-samples/coffee-shared";

@Controller('cities')
@ApiSecurity('apiKey')
export class CityController {
    constructor(private readonly cityService: CityService) {
    }

    @Get()
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityShort, isArray: true})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    async listShort(): Promise<Array<CityShort>> {
        return this.cityService.listShortAsync();
    }

    @Post()
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityEntity})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityNameError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.CONFLICT, description: 'CityDuplicatedError', type: ErrorResponse})
    async create(@Body() dto: CreateRequestDto): Promise<CityEntity> {
        return await this.cityService.createAsync(dto);
    }

    @Delete(':id')
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: DeleteResponse})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityIdError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'CityNotFoundError', type: ErrorResponse})
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResponse> {
        return this.cityService.deleteAsync(id);
    }

    @Get('weather')
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityMedium, isArray: true})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    async listMedium(): Promise<Array<CityMedium>> {
        return this.cityService.listMediumAsync();
    }

    @Get(':name/weather')
    @ApiTags('City')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityDetail})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityNameError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'CityNotFoundError', type: ErrorResponse})
    async detailByName(@Param('name') name: string): Promise<CityDetail> {
        return this.cityService.detailByNameAsync(name);
    }

    @Get('m2m/list')
    @ApiTags('City - M2M')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityEntity, isArray: true})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    async listBasic(): Promise<Array<CityEntity>> {
        return this.cityService.listBasicAsync();
    }

    @Get('m2m/:id')
    @ApiTags('City - M2M')
    @ApiResponse({status: HttpStatus.OK, description: 'OK', type: CityEntity})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'UnauthorizedError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_ACCEPTABLE, description: 'InvalidCityIdError', type: ErrorResponse})
    @ApiResponse({status: HttpStatus.NOT_FOUND, description: 'CityNotFoundError', type: ErrorResponse})
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<CityEntity> {
        return this.cityService.findByIdAsync(id);
    }
}