import { Router, NextFunction } from "express";
import { PublicUserController } from "../controllers/user.public.controller";
import limit from "../config/ratelimiting.config";
import { validateData } from '../middleware/users.validate'
import { Validations } from "../validators/users.validators";
import { deleteCookie, refreshAccessToken } from "../controllers/refreshToken.controller";
import { fileUpload } from "../middleware/uploads.middleware";

const validations = new Validations()
const controller = new PublicUserController();

const router = Router();

router.patch('/updateUserTheme/:id', controller.updateUserTheme);

router.post('/register', fileUpload, validateData(validations.registerationShema()), controller.registerUser);

router.post('/login', validateData(validations.loginSchema()), limit, controller.validateUserData);

router.post('/refresh', refreshAccessToken)

router.post('/removeCookie', deleteCookie)




export default router;
