import { Injectable } from "@nestjs/common"
import { WarrantyDto } from '@dtos/warranty.dto'
import { WarrantyRepository } from "@repositories/warranty.repository"
import { CreateWarrantyDto } from "@dtos/customer/warranty.dto"
import { Warranty } from "@entities/warranty.entity"
import { ProcessWarrantyDto } from "@dtos/staff/manage-warranty.dto"

@Injectable()
export class WarrantyService {
    constructor(
        private readonly warrantyRepository: WarrantyRepository
    ) {}

    async findAll(): Promise<WarrantyDto[]> {
        const warranties: Warranty[] = await this.warrantyRepository.findAll()
        return warranties
    }

    async create(productDto: CreateWarrantyDto): Promise<WarrantyDto> {
        const warranty: Warranty = await this.warrantyRepository.create(productDto)
        return warranty
    }

    async findUserWarranty(customerId: string, productId: string): Promise <WarrantyDto> {
        const warranty: Warranty = await this.warrantyRepository.findUserWarranty(customerId, productId)
        return warranty
    }

    async findById(id: string): Promise <WarrantyDto | null> {
        const warranty: Warranty = await this.warrantyRepository.findById(id)
        return warranty
    }

    async update(id: string, processWarrantyDto: ProcessWarrantyDto): Promise<WarrantyDto> {
        const warranty: Warranty = await this.warrantyRepository.update(id, processWarrantyDto)
        return warranty
    }
}