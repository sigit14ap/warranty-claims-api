import { Controller, Get, HttpCode, NotFoundException, UseGuards, Request, Post, UseInterceptors, UploadedFile, InternalServerErrorException, Body, Param, Put, Delete, Req } from '@nestjs/common'
import { Response } from 'src/commons/dtos/response.dto'
import { CustomerAuthGuard } from '../../guards/customer.guard'
import { ProductDto } from 'src/dtos/product.dto'
import { WarrantyService } from 'src/services/warranty.service'
import { ProductService } from 'src/services/product.service'
import { WarrantyDto } from 'src/dtos/warranty.dto'
import { CreateWarrantyDto } from 'src/dtos/customer/warranty.dto'

@UseGuards(CustomerAuthGuard)
@Controller('customers/warranty')
export class WarrantyController {

    constructor(
        private readonly warrantyService: WarrantyService,
        private readonly productService: ProductService
    ) {}

    @Post('submit/:id')
    @HttpCode(200)
    async submit(@Request() request: CreateWarrantyDto, @Param('id') id: string): Promise <Response> {
        try {
            console.log('req', request['user'])
            const product: ProductDto = await this.productService.findById(id)

            if (!product) {
                throw new NotFoundException('Product not found')
            }

            // const data: WarrantyDto = {
                // customer: request.user,

            // }
            const warranty: WarrantyDto = await this.warrantyService.create(request)

            return {
                data: warranty
            }
        } catch (error) {
            console.error(error)
            const response: any = error.getResponse()
            const message = response.message || response.error

            if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException(message)
            }
        }
    }
}
