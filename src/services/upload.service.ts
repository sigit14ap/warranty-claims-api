import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class UploadService {
    constructor() {}

    private ensureUploadPathExists(uploadPath: string) {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {
                recursive: true
            })
        }
    }

    validateFile(allowedMimeTypes: string[], file: Express.Multer.File) {
        if(!file) {
            throw new BadRequestException('File required.')
        }

        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException('Invalid file type.')
        }

        const maxSizeInBytes = 10 * 1024 * 1024
        if (file.size > maxSizeInBytes) {
            throw new BadRequestException('File size exceeds the limit of 10MB.')
        }
    }

    async uploadFile(folder: string, allowedMimeTypes: string[], file: Express.Multer.File): Promise < string > {
        this.validateFile(allowedMimeTypes, file)

        const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', folder)
        this.ensureUploadPathExists(uploadPath)

        const fileName = `${Date.now()}-${file.originalname}`
        const filePath = path.join(uploadPath, fileName)

        fs.writeFileSync(filePath, file.buffer)

        return fileName
    }

    async deleteFile(folder: string, fileName: string): Promise<void> {
        const filePath = path.resolve(__dirname, '..', '..', 'uploads', folder, fileName);
    
        if (!fs.existsSync(filePath)) {
          throw new NotFoundException('File not found.');
        }
    
        fs.unlinkSync(filePath);
    }
}
