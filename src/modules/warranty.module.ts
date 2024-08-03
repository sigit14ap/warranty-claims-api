import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { WarrantyController } from 'src/controllers/customer/warranty.controller'
import { Warranty, WarrantySchema } from 'src/entities/warranty.entity'
import { WarrantyRepository } from 'src/repositories/warranty.repository'
import { WarrantyService } from 'src/services/warranty.service'
import { CustomersModule } from './customers.module'
import { StaffModule } from './staffs.module'
import { ProductModule } from './product.module'
import { WarrantyController as WarrantyStafController } from 'src/controllers/staff/warranty.controller'

@Module({
    imports: [
        ProductModule,
        StaffModule,
        CustomersModule,
        MongooseModule.forFeature([{
            name: Warranty.name,
            schema: WarrantySchema
        }]),
    ],
    controllers: [WarrantyController, WarrantyStafController],
    providers: [WarrantyService, WarrantyRepository],
    exports: [WarrantyService, WarrantyRepository]
})
export class WarrantyModule {}