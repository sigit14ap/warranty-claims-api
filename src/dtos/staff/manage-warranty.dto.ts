import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsIn } from "class-validator"
import { WARRANTY_STATUS_APPROVED, WARRANTY_STATUS_REJECTED } from "@commons/constants/warranty.constant"

export class ProcessWarrantyDto {
    @ApiProperty({ description: 'The status of the warranty' })
    @IsString()
    @IsNotEmpty()
    @IsIn([WARRANTY_STATUS_APPROVED, WARRANTY_STATUS_REJECTED])
    status: string
}