import { PartialType } from "@nestjs/mapped-types"
import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateProductDto {
    @ApiProperty({ description: 'The name of the product form' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: 'The description of the product form' })
    @IsString()
    @IsNotEmpty()
    description: string
    
    @ApiProperty({ description: 'The image name of the product form' })
    @IsString()
    @IsOptional()
    imageName: string
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}