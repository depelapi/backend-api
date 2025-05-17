import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import reguDamkarRoutes from './reguDamkarRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/regu-damkar', reguDamkarRoutes);

export default router;