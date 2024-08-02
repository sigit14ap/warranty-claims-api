import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from '../entities/product.entity'
import { ProductController } from '../controllers/staff/product.controller'
import { ProductService } from 'src/services/product.service'
import { ProductRepository } from 'src/repositories/product.repository'
import { StaffModule } from './staffs.module'
import { ProductController as ProductCustomerController } from 'src/controllers/customer/product.controller'
import { CustomersModule } from './customers.module'

@Module({
  imports: [
    StaffModule,
    CustomersModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController, ProductCustomerController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository]
})
export class ProductModule {}
