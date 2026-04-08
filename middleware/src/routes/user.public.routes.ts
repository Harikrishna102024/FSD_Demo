import { Router } from "express";
import { userController } from "../controllers/user.controller";
import limit from "../config/ratelimiting.config";
import { validateData } from '../middleware/users.validate'
import { Validations } from "../validators/users.validators";

const validations = new Validations()

const controller = new userController();

const router = Router();

router.post('/register', validateData(validations.registerationShema()), controller.registerUser);

router.post('/login', validateData(validations.loginSchema()), limit, controller.validateUserData)


export default router;
