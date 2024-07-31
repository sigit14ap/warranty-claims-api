import { PartialType } from "@nestjs/mapped-types"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"
import { Express } from 'express'

export class ProductDto {
    id: string
    name: string
    description: string
    imageName: string
    createdAt?: Date
    updatedAt?: Date
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsOptional()
    imageName: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}