import {ApiProperty} from "@nestjs/swagger";

export class CreateRequestDto {
    @ApiProperty({description: 'City name', type: String})
    name: string;
}