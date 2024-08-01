import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { Customer } from '../entities/customer.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(email: string, password: string): Promise <Customer> {
        const customer: Customer = await this.authService.validateCustomer(email, password)

        if (!customer) {
            throw new UnauthorizedException()
        }

        return customer
    }
}