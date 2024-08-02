import { Injectable } from "@nestjs/common"
import { WarrantyDto } from '../dtos/warranty.dto'
import { WarrantyRepository } from "src/repositories/warranty.repository"
import { CreateWarrantyDto } from "src/dtos/customer/warranty.dto"
import { Warranty } from "src/entities/warranty.entity"

@Injectable()
export class WarrantyService {
    constructor(
        private readonly warrantyRepository: WarrantyRepository
    ) {}

    async create(productDto: CreateWarrantyDto): Promise<WarrantyDto> {
        const warranty: Warranty = await this.warrantyRepository.create(productDto)
        return warranty
    }

    async findById(id: string): Promise <WarrantyDto> {
        const warranty: Warranty = await this.warrantyRepository.findById(id)
        return warranty
    }
}