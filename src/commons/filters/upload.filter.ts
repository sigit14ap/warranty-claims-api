import { diskStorage } from 'multer'
import { extname } from 'path'

export const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const randomName = Array(32)
        .fill(null)
        .map(() => (Math.round(Math.random() * 16)).toString(16))
        .join('')
        cb(null, `${randomName}${extname(file.originalname)}`)
    }
})

export const fileFilter = (req: any, file: { mimetype: string }, cb: (arg0: Error, arg1: boolean) => void) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed'), false)
    }
    cb(null, true)
}