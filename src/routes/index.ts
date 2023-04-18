import { Router } from 'express';
import authRouter from './auth/auth.route';
import healthRouter from './health/health.route';
import menuRouter from './menu/menu.route';
import userRouter from './user/user.route';

const router = Router();

router.use('/auth', authRouter)
router.use('/health', healthRouter)
router.use('/user', userRouter)
router.use('/menu', menuRouter)

export default router;