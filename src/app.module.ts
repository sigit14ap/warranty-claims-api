import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { StaffModule } from './modules/staffs.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { CustomersModule } from './modules/customers.module'
import { ProductModule } from './modules/product.module'
import { WarrantyModule } from './modules/warranty.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`, {
      dbName: process.env.DATABASE_NAME,
      auth: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      },
    }),
    StaffModule,
    ProductModule,
    CustomersModule,
    WarrantyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
