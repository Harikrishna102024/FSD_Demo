import { Router } from "express";
import { userController } from "../controllers/user.controller";

const controller = new userController();

const router = Router();

router.post('/register', controller.registerUser);

router.post('/checkUserData', controller.validateUserData)


export default router;
