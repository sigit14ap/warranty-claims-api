import { Controller, Get, HttpCode, NotFoundException, UseGuards, Request, Post, UseInterceptors, UploadedFile, InternalServerErrorException, Body, Param, Put, Delete } from '@nestjs/common'
import { Response } from 'src/commons/dtos/response.dto'
import { StaffAuthGuard } from '../../guards/staff.guard'
import { ProductService } from '../../services/product.service'
import { ProductDto } from 'src/dtos/product.dto'
import { CreateProductDto, UpdateProductDto } from '../../dtos/staff/manage-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { storage, fileFilter } from 'src/commons/filters/upload.filter'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Product } from 'src/entities/product.entity'

@UseGuards(StaffAuthGuard)
@Controller('staffs/products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Product Management : List all products' })
    @ApiResponse({ status: 200, description: 'Product List', type: Product })
    @Get()
    @HttpCode(200)
    async findAll(): Promise <Response> {
        const products: ProductDto[] = await this.productService.findAll()
        return {
            data: products
        }
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Product Management : create product' })
    @ApiResponse({ status: 200, description: 'Product created', type: Product })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Post()
    @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
    @HttpCode(200)
    async create(@UploadedFile() file: Express.Multer.File, @Body() request: CreateProductDto): Promise<Response> {
        try {
            request.imageName = file.filename
            const product: ProductDto = await this.productService.create(request)
      
            return {
              data: product
            }
          } catch (error) {
            const response: any = error.getResponse()
            const message = response.message || response.error
      
            if (error instanceof InternalServerErrorException) {
              throw new InternalServerErrorException(message)
            }
        }
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Product Management : find product' })
    @ApiResponse({ status: 200, description: 'Product found', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @Get(':id')
    @HttpCode(200)
    async find(@Param('id') id: string): Promise <Response> {
        const product: ProductDto = await this.productService.findById(id)

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        return {
            data: product
        }
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Product Management : update product' })
    @ApiResponse({ status: 200, description: 'Product updated', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @Put(':id')
    @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
    @HttpCode(200)
    async update(
        @UploadedFile() file: any,
        @Param('id') id: string,
        @Body() request: UpdateProductDto
    ): Promise<Response> {

        const product: ProductDto = await this.productService.findById(id)

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        try {
            if (file) {
                request.imageName = file.filename
            }

            await this.productService.update(id, request)

            const product: ProductDto = await this.productService.findById(id)
      
            return {
              data: product
            }
          } catch (error) {
            const response: any = error.getResponse()
            const message = response.message || response.error
      
            if (error instanceof NotFoundException) {
              throw new NotFoundException(message)
            } else if (error instanceof InternalServerErrorException) {
              throw new InternalServerErrorException(message)
            }
        }
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Product Management : delete product' })
    @ApiResponse({ status: 200, description: 'Product deleted', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @Delete(':id')
    @HttpCode(200)
    async destroy(@Param('id') id: string): Promise <Response> {
        const product: ProductDto = await this.productService.findById(id)

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        await this.productService.delete(id)

        return {
            message: 'Product deleted successfully'
        }
    }
}
