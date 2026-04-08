import joi from 'joi'

export class Validations {

    loginSchema() {
        return joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(6).max(20).required()
        })
    }
}








