import { Controller, Get, HttpCode, NotFoundException, UseGuards, Request, Post, InternalServerErrorException, Body, Param, BadRequestException } from '@nestjs/common'
import { Response } from 'src/commons/dtos/response.dto'
import { CustomerAuthGuard } from '../../guards/customer.guard'
import { ProductDto } from 'src/dtos/product.dto'
import { WarrantyService } from 'src/services/warranty.service'
import { ProductService } from 'src/services/product.service'
import { WarrantyDto } from 'src/dtos/warranty.dto'
import { CreateWarrantyDto } from 'src/dtos/customer/warranty.dto'
import { WARRANTY_STATUS_PENDING, WARRANTY_STATUS_REJECTED } from 'src/commons/constants/warranty.constant'

@UseGuards(CustomerAuthGuard)
@Controller('customers/warranty')
export class WarrantyController {

    constructor(
        private readonly warrantyService: WarrantyService,
        private readonly productService: ProductService
    ) {}

    @Post('submit/:productId')
    @HttpCode(200)
    async submit(@Request() request, @Body() body: CreateWarrantyDto, @Param('productId') productId: string): Promise <Response> {
        try {
            const product: ProductDto = await this.productService.findById(productId)

            if (!product) {
                throw new NotFoundException('Product not found')
            }

            const userWarranty: WarrantyDto = await this.warrantyService.findUserWarranty(request.user.id, productId)

            if (userWarranty && userWarranty.status !== WARRANTY_STATUS_REJECTED) {
                throw new BadRequestException(`You already submitted warranty for this product and the status is ${userWarranty.status}`)
            }

            body.product = product.id
            body.customer = request.user.id
            body.status = WARRANTY_STATUS_PENDING
            
            const warranty: WarrantyDto = await this.warrantyService.create(body)

            return {
                data: warranty
            }
        } catch (error) {
            const response: any = error.getResponse()
            const message = response.message || response.error

            if (error instanceof NotFoundException) {
                throw new NotFoundException(message)
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException(message)
            } else if (error instanceof InternalServerErrorException) {
                throw new InternalServerErrorException(message)
            }
        }
    }

    @Get('detail/:productId')
    @HttpCode(200)
    async show(@Request() request, @Param('productId') productId: string): Promise <Response> {
        const product: ProductDto = await this.productService.findById(productId)

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        const warranty: WarrantyDto = await this.warrantyService.findUserWarranty(request.user.id, productId)

        if (!warranty) {
            throw new NotFoundException('Warranty not found')
        }

        return {
            data: {
                product: product,
                warranty: warranty
            }
        }
    }
}
