import { upload } from "../utils/uploads.utils";
import { Request, Response, NextFunction } from 'express';



export const fileUpload = (req: Request, res: Response, next: NextFunction) => {

    upload.single('profile')(req, res, (err) => {

        if (err) {

            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    field: 'profile',
                    message: 'File size should be less than 2MB'
                });
            }

            return res.status(400).json({
                field: 'profile',
                message: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                field: 'profile',
                message: 'Profile image is required'
            });
        }

        next()
    })

}