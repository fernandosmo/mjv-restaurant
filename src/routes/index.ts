import { Router } from 'express';
import authRouter from './auth/auth.route';
import healthRouter from './health/health.route';
import historyOrderRouter from './history-order/history-order.route';
import menuRouter from './menu/menu.route';
import tableRouter from './table/table.route';
import userRouter from './user/user.route';

const router = Router();

router.use('/auth', authRouter)
router.use('/health', healthRouter)
router.use('/user', userRouter)
router.use('/menu', menuRouter)
router.use('/table', tableRouter)
router.use('/history-order', historyOrderRouter)

export default router;