import { upload } from "../utils/uploads.utils";
import { Request, Response, NextFunction } from 'express';

export const fileUpload = (req: Request, res: Response, next: NextFunction) => {

    upload.single('profile')(req, res, (err) => {

        if (err) {
            (req as any).fileError = {
                field: 'profile',
                message: err.code === 'LIMIT_FILE_SIZE'? 'File size should be less than 2MB': 'Invalid file upload'
            };
        }

        if (!req.file) {
            (req as any).fileError = {
                field: 'profile',
                message: 'Profile image is required'
            };
        }

        next(); 
    });

}