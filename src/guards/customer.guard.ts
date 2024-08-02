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
import { CustomerService } from '../services/customer.service'

@Injectable()
export class CustomerAuthGuard extends AuthGuard('jwt') {
    @Inject(CustomerService)
    private readonly customerService: CustomerService

    constructor (customerService: CustomerService) {
        super()
        this.customerService = customerService
    }
    
    async canActivate(context: ExecutionContext): Promise <boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const { authorization }: any = request.headers

            if (!authorization || authorization.trim() === '') {
                throw new UnauthorizedException('Authorization is missing')
            }
            
            const authToken = authorization.replace(/bearer/gim, '').trim()
            const response = await this.customerService.validateToken(authToken)
            request.user = response

            return true
        } catch (error) {
            console.error(error)
            throw new ForbiddenException(error.message || 'Session expired')
        }
    }
}