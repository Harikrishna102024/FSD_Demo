import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


export const validateData = (schema: Joi.ObjectSchema) => {

    const result = async (req: Request, res: Response, next: NextFunction) => {

        console.log("VALIDATION BODY:", req.body);

        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        
        if (error) {
            
            const errors = error.details?.map((err: any) => ({
                message: err.message
            }))
            
            return res.status(400).json({
                messages: errors
            });

        } else {
            next();
        }
    }
    return result;
}

