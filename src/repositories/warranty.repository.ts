
import { Warranty, WarrantyDocument } from '../entities/warranty.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { CreateWarrantyDto } from '../dtos/customer/warranty.dto'

@Injectable()
export class WarrantyRepository {

    constructor(@InjectModel(Warranty.name) private warrantyModel: Model <WarrantyDocument>) {}

    async findById(id: string): Promise<WarrantyDocument | null> {
        const warranty = await this.warrantyModel.findById(id)
        return warranty
    }

    async create(createWarrantyDto: CreateWarrantyDto): Promise<WarrantyDocument> {
        const warranty: WarrantyDocument = await this.warrantyModel.create(createWarrantyDto)
        return warranty
    }
}