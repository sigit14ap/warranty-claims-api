import { Injectable } from '@nestjs/common'
import { RegisterDto } from '../dtos/register.dto'
import { CustomerRepository } from '../repositories/customer.repository'
import { Customer, CustomerDocument } from '../entities/customer.entity'
import { CustomerDto } from '../dtos/customer/customer.dto'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class CustomerService {

  constructor(
    private readonly customersRepository: CustomerRepository,
    private jwtService: JwtService
  ) {}
  
  async findByEmail(email: string): Promise<CustomerDto> {
    const customer: Customer = await this.customersRepository.findByEmail(email)
    return customer
  }

  async findById(id: string): Promise<CustomerDto> {
    const customer: Customer = await this.customersRepository.findById(id)
    return customer
  }

  async create(registerDto: RegisterDto): Promise<CustomerDto> {

    const salt: string = bcrypt.genSaltSync(10)
    registerDto.password = bcrypt.hashSync(registerDto.password, salt)
    const customer: Customer = await this.customersRepository.create(registerDto)

    return customer
  }

  public async validateCustomer(email: string, password: string): Promise<any> {
    const customer: Customer = await this.customersRepository.findByEmail(email)

    if (!customer) {
      return null
    }
  
    const isPasswordValid: boolean = bcrypt.compareSync(password, customer.password)

    if (!isPasswordValid) {
      return null
    }

    return customer
  }

  public async generateAcessToken(email: string, password: string): Promise<string | null> {
    const customer: Customer = await this.validateCustomer(email, password)

    if(!customer) {
        return null
    }

    const token: string = this.jwtService.sign({ id: customer.id , email })
    
    return token
  }

  async validateToken(token: string): Promise<any> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret : process.env.JWT_SECRET
    })

    const customer = await this.findById(payload.id)
    return customer
  }
}
