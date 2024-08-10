import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { StaffService } from '@services/staff.service'
import { Staff } from '@entities/staff.entity'

@Injectable()
export class StaffJwtStrategy extends PassportStrategy(Strategy) {
    constructor(private staffService: StaffService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(email: string, password: string): Promise <Staff> {
        const staff: Staff = await this.staffService.validateStaff(email, password)

        if (!staff) {
            throw new UnauthorizedException()
        }

        return staff
    }
}