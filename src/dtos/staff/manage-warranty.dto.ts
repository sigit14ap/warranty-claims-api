import { IsString, IsNotEmpty, IsIn } from "class-validator"
import { WARRANTY_STATUS_APPROVED, WARRANTY_STATUS_REJECTED } from "src/commons/constants/warranty.constant"

export class ProcessWarrantyDto {
    @IsString()
    @IsNotEmpty()
    @IsIn([WARRANTY_STATUS_APPROVED, WARRANTY_STATUS_REJECTED])
    status: string
}