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
  import { AuthService } from '../services/auth.service'
  import { RegisterCustomerDto } from '../dtos/register.dto'
  import { CustomerDto } from '../dtos/customer.dto'
  import { Response } from 'src/commons/dtos/response.dto'
  import { LoginCustomerDto } from '../dtos/login.dto'
  import { JwtAuthGuard } from '../guards/jwt.guard'
  
  @Controller('customers')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    @HttpCode(200)
    async register(@Body() registerDto: RegisterCustomerDto): Promise <Response> {
      try {
        const existingEmail: CustomerDto = await this.authService.findByEmail(registerDto.email)
  
        if (existingEmail) {
          throw new ConflictException('Email already exists')
        }
  
        const customer: CustomerDto = await this.authService.create(registerDto)
  
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
  
    @Post('login')
    @HttpCode(200)
    async login(@Body() loginCustomerDto: LoginCustomerDto): Promise <Response> {
      const { email, password } = loginCustomerDto
      const accessToken: string | null = await this.authService.generateAcessToken(email, password)
  
      if (!accessToken) {
        throw new UnauthorizedException('Email or password is not match')
      }
  
      return {
        data: {
          access_token: accessToken
        }
      }
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(200)
    async profile(@Request() request: any): Promise <Response> {
      const { id } = request.user
      const customer: CustomerDto = await this.authService.findById(id)
  
      if (!customer) {
        throw new NotFoundException('Profile not found')
      }
  
      return {
        data: customer
      }
    }
  }
  