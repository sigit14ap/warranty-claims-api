import { Module } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { AuthController } from '../controllers/auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Staff, StaffSchema } from '../entities/staff.entity'
import { StaffsRepository } from '../repositories/staffs.repository'
import { LocalStrategy } from '../strategy/local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../strategy/jwt.strategy'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_VALIDITY }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, StaffsRepository, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
