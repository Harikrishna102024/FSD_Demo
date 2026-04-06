import { Router } from "express";
import userRoutes from "./user.routes";
import { jwtAuth } from "../middleware/jwt.auth";
import publicRoutes from './user.public.routes'
import limit from "../config/ratelimiting.config";


const router = Router();

router.use('/auth', limit, publicRoutes);
router.use('/users', jwtAuth, userRoutes);

export default router;
