import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { StaffsService } from '../services/staffs.service';
import { CreateStaffDto } from '../dtos/create-staff.dto';
import { UpdateStaffDto } from '../dtos/update-staff.dto';
import { StaffDto } from '../dtos/staff.dto';
import { Response } from '../../commons/dtos/response.dto';

@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createStaffDto: CreateStaffDto): Promise<Response> {
    try {
      const existingEmail: StaffDto = await this.staffsService.findByEmail(createStaffDto.email)

      if (existingEmail) {
        throw new ConflictException('Email already exists')
      }

      const staff: StaffDto = await this.staffsService.create(createStaffDto)

      return {
          statusCode: 200,
          data: staff
      }
    } catch (error) {
      const response: any = error.getResponse()
      const message = response.message || response.error

      if (error instanceof ConflictException) {
          throw new ConflictException(message)
      } else if (error instanceof InternalServerErrorException) {
          throw new InternalServerErrorException(message)
      } else {
          throw new InternalServerErrorException('Something Error')
      }
    }
  }
}
