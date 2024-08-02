import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateWarrantyDto {
    @IsString()
    @IsNotEmpty()
    description: string;
}