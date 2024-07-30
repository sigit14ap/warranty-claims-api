
import { Staff, StaffDocument } from '../entities/staff.entity'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { CreateStaffDto } from '../dtos/create-staff.dto'
import { Injectable, ConflictException } from '@nestjs/common'

@Injectable()
export class StaffsRepository {

    constructor(@InjectModel(Staff.name) private staffModel: Model <StaffDocument>) {}

    async findByEmail(email: string): Promise<StaffDocument | null> {
        const staff = await this.staffModel.findOne({ email })
        return staff
    }

    async create(createStaffDto: CreateStaffDto): Promise<StaffDocument> {
        const staff: StaffDocument = await this.staffModel.create(createStaffDto)
        return staff
    }
}