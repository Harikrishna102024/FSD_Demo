import { Router } from "express";
import { userController } from "../controllers/user.controller";

const controller = new userController();

const router = Router();

router.post('/register', controller.registerUser);

router.get('/getUsers', controller.getUsersData);

router.delete('/deleteUser/:id', controller.deleteUserData);

router.patch('/updateUserData', controller.updateUserData);

router.post('/checkUserData', controller.validateUserData)

export default router;
