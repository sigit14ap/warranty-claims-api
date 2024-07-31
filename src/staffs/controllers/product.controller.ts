import { Controller, Get, HttpCode, NotFoundException, UseGuards, Request, Post, UseInterceptors, UploadedFile, InternalServerErrorException, Body, Param, Put, Delete } from '@nestjs/common';
import { Response } from 'src/commons/dtos/response.dto'
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ProductService } from '../services/product.service';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../dtos/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, fileFilter } from 'src/commons/filters/upload.filter';

@UseGuards(JwtAuthGuard)
@Controller('staffs/products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    @HttpCode(200)
    async findAll(@Request() request: any): Promise <Response> {
        const products: ProductDto[] = await this.productService.findAll()
        return {
            data: products
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage, fileFilter }))
    @HttpCode(200)
    async create(@UploadedFile() file: any, @Body() request: CreateProductDto): Promise<Response> {
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
      
            if (error instanceof InternalServerErrorException) {
              throw new InternalServerErrorException(message)
            }
        }
    }

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
