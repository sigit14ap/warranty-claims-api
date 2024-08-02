import { Controller, Get, HttpCode, NotFoundException, UseGuards, Request, Post, UseInterceptors, UploadedFile, InternalServerErrorException, Body, Param, Put, Delete } from '@nestjs/common'
import { Response } from 'src/commons/dtos/response.dto'
import { CustomerAuthGuard } from '../../guards/customer.guard'
import { ProductService } from '../../services/product.service'
import { ProductDto } from 'src/dtos/product.dto'

@UseGuards(CustomerAuthGuard)
@Controller('customers/products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    @HttpCode(200)
    async findAll(): Promise <Response> {
        const products: ProductDto[] = await this.productService.findAll()
        return {
            data: products
        }
    }
}
