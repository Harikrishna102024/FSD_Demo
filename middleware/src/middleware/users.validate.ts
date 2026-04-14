import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateData = (schema: Joi.ObjectSchema) => {

    const result = async (req: Request, res: Response, next: NextFunction) => {

        const { error } = schema.validate(req.body, {
            abortEarly: false
        });
        
        if (error) {
            (req as any).validationErrors = error.details.map((err: any) => ({
                message: err.message
            }));
        }

        next();
    }

    return result;
}