import { Injectable } from "@nestjs/common";
import { CreateProductDto, ProductDto, UpdateProductDto } from "../dtos/product.dto";
import { Product } from "../entities/product.entity";
import { ProductRepository } from "../repositories/product.repository";

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    async findAll(): Promise<ProductDto[]> {
        const product: Product[] = await this.productRepository.findAll()
        return product
    }

    async create(createProductDto: CreateProductDto): Promise<ProductDto> {
        const product: Product = await this.productRepository.create(createProductDto)
        return product
    }

    async findById(id: string): Promise <ProductDto> {
        const product: Product = await this.productRepository.findById(id)
        return product
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDto> {
        const product: Product = await this.productRepository.update(id, updateProductDto)
        return product
    }

    async delete(id: string): Promise <ProductDto> {
        const product: Product = await this.productRepository.delete(id)
        return product
    }
}