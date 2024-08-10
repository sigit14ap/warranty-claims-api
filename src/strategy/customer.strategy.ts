import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CustomerService } from '@services/customer.service'
import { Customer } from '@entities/customer.entity'

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy) {
    constructor(private customerService: CustomerService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(email: string, password: string): Promise <Customer> {
        const customer: Customer = await this.customerService.validateCustomer(email, password)

        if (!customer) {
            throw new UnauthorizedException()
        }

        return customer
    }
}