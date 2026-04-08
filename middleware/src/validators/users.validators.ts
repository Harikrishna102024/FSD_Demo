import joi, { object } from 'joi'

export class Validations {

    loginSchema() {
        return joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(6).max(20).required()
        })
    }

    registerationShema() {
        return joi.object({
            firstName: joi.string().pattern(/^[A-Z][a-z]+$/).required().messages({
                "string.pattern.base": "firstName First letter must be capital and remaining must be small letters"
            }),
            lastName: joi.string().pattern(/^[A-Z][a-z]+$/).required().messages({
                "string.pattern.base": "lastName First letter must be capital and remaining must be small letters"
            }),
            age: joi.number().min(1).max(99).required(),
            location: joi.string().pattern(/^[A-Za-z ]+$/).required().messages({
                "string.pattern.base": "Location not allow numaric values"
            }),
            status: joi.string().valid('active', 'inactive').required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).+$/).messages({
                "string.pattern.base": "Password contain atleast one UPPERCASE, LOWERCASE, NUMBER, SPECIAL-CHARECTER"
            }),
        })
    }

    updateUserSchema() {
        return this.registerationShema().keys({
            id: joi.number().min(1).required()
        })
    }
}

