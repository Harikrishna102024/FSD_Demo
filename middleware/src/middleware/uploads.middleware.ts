import multer from 'multer';
import path from 'path';
import fs from 'fs'
import cloudinary from '../config/cloud.config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'user_profiles',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    } as any,
});

const fileFilter = (req: any, file: any, cb: any) => {

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'), false);
    }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1024 * 1024
  },
  fileFilter
});





// const uploadPath = path.join(process.cwd(), "uploads");

// if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath);
// }
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         const fileName = `${Date.now()}-${file.originalname}`
//         cb(null, fileName)
//     }
// })