import multer from 'multer';
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
    fileSize: 2 * 1024 * 1024
  },
  fileFilter
});