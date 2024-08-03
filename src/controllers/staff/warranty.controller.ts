import { Controller, Get, HttpCode, NotFoundException, UseGuards, InternalServerErrorException, Body, Param, Put, BadRequestException } from '@nestjs/common'
import { Response } from 'src/commons/dtos/response.dto'
import { WarrantyService } from 'src/services/warranty.service'
import { WarrantyDto } from 'src/dtos/warranty.dto'
import { WARRANTY_STATUS_PENDING, WARRANTY_STATUS_REJECTED } from 'src/commons/constants/warranty.constant'
import { StaffAuthGuard } from 'src/guards/staff.guard'
import { ProcessWarrantyDto } from 'src/dtos/staff/manage-warranty.dto'

@UseGuards(StaffAuthGuard)
@Controller('staffs/warranties')
export class WarrantyController {

    constructor(
        private readonly warrantyService: WarrantyService
    ) {}
    
    @Get()
    @HttpCode(200)
    async index(): Promise <Response> {
        const warranties: WarrantyDto[] = await this.warrantyService.findAll()

        return {
            data: warranties
        }
    }

    @Get(':warrantyId')
    @HttpCode(200)
    async show(@Param('warrantyId') warrantyId: string): Promise <Response> {
        const warranty: WarrantyDto = await this.warrantyService.findById(warrantyId)

        if (!warranty) {
            throw new NotFoundException('Warranty not found')
        }

        return {
            data: warranty
        }
    }

    @Put(':warrantyId')
    @HttpCode(200)
    async process(@Body() body: ProcessWarrantyDto, @Param('warrantyId') warrantyId: string): Promise <Response> {
        try {
            const customerWarranty: WarrantyDto = await this.warrantyService.findById(warrantyId)

            if (!customerWarranty) {
                throw new NotFoundException('Warranty not found')
            }

            if (customerWarranty.status !== WARRANTY_STATUS_PENDING) {
                throw new BadRequestException(`Warranty only able to processed when the status is ${WARRANTY_STATUS_PENDING}`)
            }
            
            await this.warrantyService.update(warrantyId, body)

            const warranty: WarrantyDto = await this.warrantyService.findById(warrantyId)

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
}
