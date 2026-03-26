import { Router } from "express";
import { userController } from "../controllers/user.controller";

const controller = new userController();

const router = Router();

router.get('/getUsers', controller.getUsersData);

router.delete('/deleteUser/:id', controller.deleteUserData);

router.patch('/updateUserData', controller.updateUserData);

router.get('/userlogs', controller.getUserLogs);


export default router;
