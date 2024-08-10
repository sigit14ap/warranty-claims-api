import {
    Controller,
    Get,
    HttpCode,
    NotFoundException,
    UseGuards,
    Request,
    Post,
    InternalServerErrorException,
    Body,
    Param,
    BadRequestException
} from '@nestjs/common'
import { Response } from '@dtos/response.dto'
import { CustomerAuthGuard } from '@guards/customer.guard'
import { ProductDto } from '@dtos/product.dto'
import { WarrantyService } from '@services/warranty.service'
import { ProductService } from '@services/product.service'
import { WarrantyDto } from '@dtos/warranty.dto'
import { CreateWarrantyDto } from '@dtos/customer/warranty.dto'
import { WARRANTY_STATUS_PENDING, WARRANTY_STATUS_REJECTED } from '@commons/constants/warranty.constant'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Warranty } from '@entities/warranty.entity'

@UseGuards(CustomerAuthGuard)
@Controller('customers/warranty')
export class WarrantyController {

    constructor(
        private readonly warrantyService: WarrantyService,
        private readonly productService: ProductService
    ) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Submit warranty' })
    @ApiResponse({ status: 200, description: 'Warranty submitted', type: Warranty })
    @ApiResponse({ status: 400, description: 'Failed to submit warranty' })
    @ApiResponse({ status: 404, description: 'Warranty not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
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

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Detail of warranty' })
    @ApiResponse({ status: 200, description: 'Warranty detail', type: Warranty })
    @ApiResponse({ status: 404, description: 'Warranty not found' })
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
