import {
  Controller,
  Post,
  Body,
  HttpCode,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
  Get,
  Request,
  NotFoundException
} from '@nestjs/common'
import { StaffService } from '../../services/staff.service'
import { RegisterDto } from '../../dtos/register.dto'
import { StaffDto } from '../../dtos/staff/staff.dto'
import { Response } from 'src/commons/dtos/response.dto'
import { LoginDto } from '../../dtos/login.dto'
import { StaffAuthGuard } from '../../guards/staff.guard'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Staff } from 'src/entities/staff.entity'

@Controller('staffs')
export class StaffAuthController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({ summary: 'Staff Register' })
  @ApiResponse({ status: 200, description: 'Success registered', type: Staff })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto): Promise <Response> {
    try {
      const existingEmail: StaffDto = await this.staffService.findByEmail(registerDto.email)

      if (existingEmail) {
        throw new ConflictException('Email already exists')
      }

      const staff: StaffDto = await this.staffService.create(registerDto)

      return {
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

  @ApiOperation({ summary: 'Staff Login' })
  @ApiResponse({ status: 200, description: 'Success authenticated', type: Staff })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginStaffDto: LoginDto): Promise <Response> {
    const { email, password } = loginStaffDto
    const accessToken: string | null = await this.staffService.generateAcessToken(email, password)

    if (!accessToken) {
      throw new UnauthorizedException('Email or password is not match')
    }

    return {
      data: {
        access_token: accessToken
      }
    }
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Staff profile'})
  @ApiResponse({status: 200, description: 'Success get profile', type: Staff})
  @UseGuards(StaffAuthGuard)
  @Get('profile')
  @HttpCode(200)
  async profile(@Request() request: any): Promise <Response> {
    const { id } = request.user
    const staff: StaffDto = await this.staffService.findById(id)

    if (!staff) {
      throw new NotFoundException('Profile not found')
    }

    return {
      data: staff
    }
  }
}
