import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

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