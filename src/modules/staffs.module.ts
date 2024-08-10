import { Module } from '@nestjs/common'
import { StaffService } from '@services/staff.service'
import { StaffAuthController } from '@controllers/staff/auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Staff, StaffSchema } from '@entities/staff.entity'
import { StaffsRepository } from '@repositories/staffs.repository'
import { StaffJwtStrategy } from '@strategy/staff.strategy'
import { StaffAuthGuard } from '@guards/staff.guard'
import { JwtModule } from '@nestjs/jwt'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_VALIDITY }
    }),
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
  ],
  controllers: [StaffAuthController],
  providers: [StaffService, StaffsRepository, StaffJwtStrategy, StaffAuthGuard],
  exports: [StaffService, StaffAuthGuard]
})
export class StaffModule {}
