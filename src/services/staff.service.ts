import { Injectable } from '@nestjs/common'
import { RegisterDto } from '../dtos/register.dto'
import { StaffsRepository } from '../repositories/staffs.repository'
import { Staff } from '../entities/staff.entity'
import { StaffDto } from '../dtos/staff/staff.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class StaffService {

  constructor(
    private readonly staffsRepository: StaffsRepository,
    private jwtService: JwtService
  ) {}
  
  async findByEmail(email: string): Promise<StaffDto> {
    const staff: Staff = await this.staffsRepository.findByEmail(email)
    return staff
  }

  async findById(id: string): Promise<StaffDto> {
    const staff: Staff = await this.staffsRepository.findById(id)
    return staff
  }

  async create(registerDto: RegisterDto): Promise<StaffDto> {

    const salt: string = bcrypt.genSaltSync(10)
    registerDto.password = bcrypt.hashSync(registerDto.password, salt)
    const staff: Staff = await this.staffsRepository.create(registerDto)

    return staff
  }

  public async validateStaff(email: string, password: string): Promise<any> {
    const staff: Staff = await this.staffsRepository.findByEmail(email)

    if (!staff) {
      return null
    }
  
    const isPasswordValid: boolean = bcrypt.compareSync(password, staff.password)

    if (!isPasswordValid) {
      return null
    }

    return staff
  }

  public async generateAcessToken(email: string, password: string): Promise<string | null> {
    const staff: Staff = await this.validateStaff(email, password)

    if(!staff) {
        return null
    }

    const token: string = this.jwtService.sign({ id: staff.id , email })
    
    return token
  }

  validateToken(token: string): any {
    return this.jwtService.verify(token, {
      secret : process.env.JWT_SECRET
    })
  }
}
