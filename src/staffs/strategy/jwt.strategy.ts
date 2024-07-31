import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { Staff } from '../entities/staff.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(email: string, password: string): Promise <Staff> {
        const staff: Staff = await this.authService.validateStaff(email, password)

        if (!staff) {
            throw new UnauthorizedException()
        }

        return staff
    }
}