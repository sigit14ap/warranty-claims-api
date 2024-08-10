
import { Product, ProductDocument } from '@entities/product.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { CreateProductDto, UpdateProductDto } from '@dtos/staff/manage-product.dto'

@Injectable()
export class ProductRepository {

    constructor(@InjectModel(Product.name) private productModel: Model <ProductDocument>) {}

    async findAll(): Promise<ProductDocument[]> {
        const product = await this.productModel.find()
        return product
    }

    async findById(id: string): Promise<ProductDocument | null> {
        const product = await this.productModel.findById(id)
        return product
    }

    async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
        const product: ProductDocument = await this.productModel.create(createProductDto)
        return product
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument> {
        return this.productModel.findByIdAndUpdate(id, updateProductDto).exec()
    }
    
    async delete(id: string): Promise<ProductDocument> {
        return this.productModel.findByIdAndDelete(id).exec()
    }
}