
import { Customer, CustomerDocument } from '../entities/customer.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { RegisterDto } from '../dtos/register.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CustomerRepository {

    constructor(@InjectModel(Customer.name) private customerModel: Model <CustomerDocument>) {}

    async findByEmail(email: string): Promise<CustomerDocument | null> {
        const customer = await this.customerModel.findOne({ email })
        return customer
    }

    async findById(id: string): Promise<CustomerDocument | null> {
        const customer = await this.customerModel.findById(id)
        return customer
    }

    async create(registerDto: RegisterDto): Promise<CustomerDocument> {
        const customer: CustomerDocument = await this.customerModel.create(registerDto)
        return customer
    }
}