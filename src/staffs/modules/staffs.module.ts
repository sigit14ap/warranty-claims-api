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
import { Product, ProductSchema } from '../entities/product.entity'
import { ProductController } from '../controllers/product.controller'
import { ProductService } from '../services/product.service'
import { ProductRepository } from '../repositories/product.repository'

dotenv.config()

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_VALIDITY }
    }),
  ],
  controllers: [AuthController, ProductController],
  providers: [AuthService, StaffsRepository, ProductService, ProductRepository, LocalStrategy, JwtStrategy],
})
export class StaffsService {}
