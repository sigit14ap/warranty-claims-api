import { Injectable } from '@nestjs/common'
import { CreateStaffDto } from '../dtos/create-staff.dto'
import { UpdateStaffDto } from '../dtos/update-staff.dto'
import { StaffsRepository } from '../repositories/staffs.repository'
import { Staff, StaffDocument } from '../entities/staff.entity'
import { StaffDto } from '../dtos/staff.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class StaffsService {

  constructor(private readonly staffsRepository: StaffsRepository) {}
  
  async findByEmail(email: string): Promise<StaffDto> {
    const staff: Staff = await this.staffsRepository.findByEmail(email)
    return staff
  }

  async create(createStaffDto: CreateStaffDto): Promise<StaffDto> {

    const salt: string = bcrypt.genSaltSync(10)
    createStaffDto.password = bcrypt.hashSync(createStaffDto.password, salt)
    const staff: Staff = await this.staffsRepository.create(createStaffDto)

    return staff
  }
}
