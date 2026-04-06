import { Router } from "express";
import userRoutes from "./user.routes";
import { jwtAuth } from "../middleware/jwt.auth";
import publicRoutes from './user.public.routes'


const router = Router();

router.use('/auth', publicRoutes);
router.use('/users', jwtAuth, userRoutes);

export default router;
