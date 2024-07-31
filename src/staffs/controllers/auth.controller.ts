import { Controller, Post, Body, HttpCode, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { RegisterStaffDto } from '../dtos/register.dto'
import { StaffDto } from '../dtos/staff.dto'
import { Response } from '../../commons/dtos/response.dto'
import { LoginStaffDto } from '../dtos/login.dto'

@Controller('staffs')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDto: RegisterStaffDto): Promise <Response> {
    try {
      const existingEmail: StaffDto = await this.authService.findByEmail(registerDto.email)

      if (existingEmail) {
        throw new ConflictException('Email already exists')
      }

      const staff: StaffDto = await this.authService.create(registerDto)

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

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginStaffDto: LoginStaffDto): Promise < Response > {
    const { email, password } = loginStaffDto
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
}
