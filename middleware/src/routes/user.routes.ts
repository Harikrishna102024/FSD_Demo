import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { validateData } from "../middleware/users.validate";
import { Validations } from "../validators/users.validators";
import { upload } from "../utils/uploads.utils";


const validations = new Validations()
const controller = new userController();

const router = Router();

router.get('/getUsers', controller.getUsersData);

router.delete('/deleteUser/:id', controller.deleteUserData);

router.patch('/updateUserData', upload.single('profile'), validateData(validations.updateUserSchema()), controller.updateUserData);

router.get('/userlogs', controller.getUserLogs);


export default router;
