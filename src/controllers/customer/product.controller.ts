import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common'
import { Response } from '@dtos/response.dto'
import { CustomerAuthGuard } from '@guards/customer.guard'
import { ProductService } from '@services/product.service'
import { ProductDto } from '@dtos/product.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Product } from '@entities/product.entity'

@UseGuards(CustomerAuthGuard)
@Controller('customers/products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Product list' })
    @ApiResponse({ status: 200, description: 'Product list', type: Product })
    @Get()
    @HttpCode(200)
    async findAll(): Promise <Response> {
        const products: ProductDto[] = await this.productService.findAll()
        return {
            data: products
        }
    }
}
