import { Router } from "express";
import { userController } from "../controllers/user.controller";
import limit from "../config/ratelimiting.config";

const controller = new userController();

const router = Router();

router.post('/register', controller.registerUser);

router.post('/login', limit, controller.validateUserData)


export default router;
