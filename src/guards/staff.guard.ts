import {
    ExecutionContext,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import {
    AuthGuard
} from '@nestjs/passport'
import { StaffService } from '../services/staff.service'

@Injectable()
export class StaffAuthGuard extends AuthGuard('jwt') {

    @Inject(StaffService)
    private readonly staffService: StaffService

    constructor (staffService: StaffService) {
        super()
        this.staffService = staffService
    }
    
    async canActivate(context: ExecutionContext): Promise <boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const { authorization }: any = request.headers

            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Authorization is missing')
            }
            
            const authToken = authorization.replace(/bearer/gim, '').trim()
            const response = await this.staffService.validateToken(authToken)
            request.user = response

            return true
        } catch (error) {
            console.error('err', error)
            throw new ForbiddenException(error.message || 'Session expired')
        }
    }
}