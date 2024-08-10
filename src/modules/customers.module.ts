import { Module } from '@nestjs/common'
import { CustomerAuthController } from '@controllers/customer/auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Customer, CustomerSchema } from '@entities/customer.entity'
import { CustomerRepository } from '@repositories/customer.repository'
import { CustomerService } from '@services/customer.service'
import { CustomerJwtStrategy } from '@strategy/customer.strategy'
import { Product, ProductSchema } from '@entities/product.entity'
import { CustomerAuthGuard } from '@guards/customer.guard'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_VALIDITY }
    }),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [CustomerAuthController],
  providers: [CustomerService, CustomerRepository, CustomerJwtStrategy, CustomerAuthGuard],
  exports: [CustomerService, CustomerAuthGuard]
})
export class CustomersModule {}
