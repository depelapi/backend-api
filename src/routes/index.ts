import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import reguDamkarRoutes from './reguDamkarRoutes';
import titikKameraRoutes from './titikKameraRoutes';
import pelaporanRoutes from './pelaporanRoutes';
import penangananRoutes from './penangananRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/regu-damkar', reguDamkarRoutes);
router.use('/titik-kamera', titikKameraRoutes);
router.use('/pelaporan', pelaporanRoutes);
router.use('/penanganan', penangananRoutes);

export default router;