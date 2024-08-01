import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from 'src/customers/entities/customer.entity';
import { CustomerRepository } from 'src/customers/repositories/customer.repository';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_VALIDITY }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomerRepository, JwtStrategy],
})
export class CustomersModule {}
