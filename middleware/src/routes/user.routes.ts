import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { jwtAuth } from "../middleware/jwt.auth";

const controller = new userController();

const router = Router();

router.post('/register', controller.registerUser);

router.get('/getUsers', jwtAuth, controller.getUsersData);

router.delete('/deleteUser/:id', jwtAuth, controller.deleteUserData);

router.patch('/updateUserData', jwtAuth, controller.updateUserData);

router.post('/checkUserData', controller.validateUserData)

export default router;
