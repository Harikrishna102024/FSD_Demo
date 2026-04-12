import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';


export const validateData = (schema: Joi.ObjectSchema) => {

    const result = async (req: Request, res: Response, next: NextFunction) => {

        console.log("VALIDATION BODY:", req.body);

        const { error } = schema.validate(req.body);

        if (error) {

            return res.status(400).json({
                message: error.message
            });

        } else {
            next();
        }
    }
    return result;
}

