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
  import { CustomerService } from '../../services/customer.service'
  import { RegisterDto } from '../../dtos/register.dto'
  import { CustomerDto } from '../../dtos/customer/customer.dto'
  import { Response } from 'src/commons/dtos/response.dto'
  import { LoginDto } from '../../dtos/login.dto'
  import { CustomerAuthGuard } from '../../guards/customer.guard'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Staff } from 'src/entities/staff.entity'
import { Customer } from 'src/entities/customer.entity'
  
@Controller('customers')
export class CustomerAuthController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({summary: 'Customer Register'})
  @ApiResponse({status: 200, description: 'Success registered', type: Customer})
  @ApiResponse({status: 409, description: 'Email already registered'})
  @ApiResponse({status: 500, description: 'Internal server error'})
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterDto): Promise < Response > {
    try {
      const existingEmail: CustomerDto = await this.customerService.findByEmail(registerDto.email)

      if (existingEmail) {
        throw new ConflictException('Email already exists')
      }

      const customer: CustomerDto = await this.customerService.create(registerDto)

      return {
        data: customer
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

  @ApiOperation({summary: 'Customer Login'})
  @ApiResponse({status: 200, description: 'Success authenticated', type: Customer})
  @ApiResponse({status: 401, description: 'Unauthorized.'})
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginCustomerDto: LoginDto): Promise < Response > {
    const {
      email,
      password
    } = loginCustomerDto
    
    const accessToken: string | null = await this.customerService.generateAcessToken(email, password)

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
  @ApiOperation({summary: 'Customer profile'})
  @ApiResponse({status: 200, description: 'Success get profile', type: Customer})
  @UseGuards(CustomerAuthGuard)
  @Get('profile')
  @HttpCode(200)
  async profile(@Request() request: any): Promise < Response > {
    const {
      id
    } = request.user
    const customer: CustomerDto = await this.customerService.findById(id)

    if (!customer) {
      throw new NotFoundException('Profile not found')
    }

    return {
      data: customer
    }
  }
}
  