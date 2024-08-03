
import { Warranty, WarrantyDocument } from '../entities/warranty.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { CreateWarrantyDto } from '../dtos/customer/warranty.dto'
import { ProcessWarrantyDto } from 'src/dtos/staff/manage-warranty.dto'

@Injectable()
export class WarrantyRepository {

    constructor(@InjectModel(Warranty.name) private warrantyModel: Model <WarrantyDocument>) {}

    async findUserWarranty(customerId: string, productId: string): Promise<WarrantyDocument | null> {
        const warranty = await this.warrantyModel.findOne({ customer: customerId, product: productId }).exec()
        return warranty
    }

    async findAll(): Promise<WarrantyDocument[]> {
        const warranties: WarrantyDocument[] = await this.warrantyModel.find().populate(['customer', 'product'])
        return warranties
    }

    async findById(id: string): Promise<WarrantyDocument | null> {
        const warranty = await this.warrantyModel.findById(id).populate(['customer', 'product'])
        return warranty
    }

    async create(createWarrantyDto: CreateWarrantyDto): Promise<WarrantyDocument> {
        const warranty: WarrantyDocument = await this.warrantyModel.create(createWarrantyDto)
        return warranty
    }

    async update(id: string, ProcessWarrantyDto: ProcessWarrantyDto): Promise<WarrantyDocument> {
        return this.warrantyModel.findByIdAndUpdate(id, ProcessWarrantyDto).exec()
    }
}