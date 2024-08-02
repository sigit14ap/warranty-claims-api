
import { Staff, StaffDocument } from '../entities/staff.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { RegisterDto } from '../dtos/register.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StaffsRepository {

    constructor(@InjectModel(Staff.name) private staffModel: Model <StaffDocument>) {}

    async findByEmail(email: string): Promise<StaffDocument | null> {
        const staff = await this.staffModel.findOne({ email })
        return staff
    }

    async findById(id: string): Promise<StaffDocument | null> {
        const staff = await this.staffModel.findById(id)
        return staff
    }

    async create(registerDto: RegisterDto): Promise<StaffDocument> {
        const staff: StaffDocument = await this.staffModel.create(registerDto)
        return staff
    }
}