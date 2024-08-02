import { Module } from '@nestjs/common'
import { CustomerAuthController } from '../controllers/customer/auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Customer, CustomerSchema } from 'src/entities/customer.entity'
import { CustomerRepository } from 'src/repositories/customer.repository'
import { CustomerService } from '../services/customer.service'
import { CustomerJwtStrategy } from '../strategy/customer.strategy'
import { Product, ProductSchema } from 'src/entities/product.entity'
import { CustomerAuthGuard } from 'src/guards/customer.guard'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [CustomerAuthController],
  providers: [CustomerService, CustomerRepository, CustomerJwtStrategy, CustomerAuthGuard],
  exports: [CustomerService, CustomerAuthGuard]
})
export class CustomersModule {}
