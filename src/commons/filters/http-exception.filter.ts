import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch (exception: HttpException, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp()
        const res: Response = ctx.getResponse <Response>()
        const req: Request = ctx.getRequest <Request>()
        const status: HttpStatus = exception.getStatus()
        const exceptionResponse: any = exception.getResponse()

        res.status(status).json({
            messages: exceptionResponse.message,
            error: exceptionResponse.error,
        })
    }
}