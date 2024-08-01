import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import {
    AuthGuard
} from '@nestjs/passport'
import { AuthService } from '../services/auth.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly authService: AuthService) {
        super()
    }
    
    async canActivate(context: ExecutionContext): Promise <boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const { authorization }: any = request.headers

            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Authorization is missing')
            }
            
            const authToken = authorization.replace(/bearer/gim, '').trim()
            const response = await this.authService.validateToken(authToken)
            request.user = response

            return true
        } catch (error) {
            throw new ForbiddenException(error.message || 'Session expired')
        }
    }
}