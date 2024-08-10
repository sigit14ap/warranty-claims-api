import { Controller, Get, HttpCode, NotFoundException, UseGuards, InternalServerErrorException, Body, Param, Put, BadRequestException } from '@nestjs/common'
import { Response } from '@dtos/response.dto'
import { WarrantyService } from '@services/warranty.service'
import { WarrantyDto } from '@dtos/warranty.dto'
import { WARRANTY_STATUS_PENDING, WARRANTY_STATUS_REJECTED } from '@commons/constants/warranty.constant'
import { StaffAuthGuard } from '@guards/staff.guard'
import { ProcessWarrantyDto } from '@dtos/staff/manage-warranty.dto'
import { Warranty } from '@entities/warranty.entity'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@UseGuards(StaffAuthGuard)
@Controller('staffs/warranties')
export class WarrantyController {

    constructor(
        private readonly warrantyService: WarrantyService
    ) {}
    
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Warranty Management : list' })
    @ApiResponse({ status: 200, description: 'List of warranty', type: Warranty })
    @Get()
    @HttpCode(200)
    async index(): Promise <Response> {
        const warranties: WarrantyDto[] = await this.warrantyService.findAll()

        return {
            data: warranties
        }
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Warranty Management : detail warranty' })
    @ApiResponse({ status: 200, description: 'Warranty detail', type: Warranty })
    @ApiResponse({ status: 404, description: 'Warranty not found' })
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

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Warranty Management : update warranty' })
    @ApiResponse({ status: 200, description: 'Warranty updated', type: Warranty })
    @ApiResponse({ status: 404, description: 'Warranty not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
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
