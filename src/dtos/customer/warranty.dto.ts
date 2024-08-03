import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateWarrantyDto {
    @ApiProperty({ description: 'The description of the warranty' })
    @IsString()
    @IsNotEmpty()
    description: string;

    status?: string

    product?: string
    customer?: string
}