import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { extname } from 'path'

@Injectable()
export class FileValidationPipe implements PipeTransform {
    private allowedMimetypes = ['image/jpeg', 'image/png']

    transform(value: any, metadata: ArgumentMetadata) {
        const file = value

        if (!file) {
            throw new BadRequestException('No file uploaded')
        }

        const mimetype = file.mimetype
        const ext = extname(file.originalname)

        if (!this.allowedMimetypes.includes(mimetype)) {
            throw new BadRequestException(`Invalid file type. Allowed types: ${this.allowedMimetypes.join(', ')}`)
        }

        return value
    }
}
