import { Router } from 'express';
import { PenyalahgunaanPelaporanController } from '../controllers/penyalahgunaanPelaporanController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const penyalahgunaanPelaporanController = new PenyalahgunaanPelaporanController();

router.use(authenticateToken);

router.get('/count/pelaporan/:pelaporanId', penyalahgunaanPelaporanController.getCountByPelaporan);
router.get('/pelaporan/:pelaporanId', penyalahgunaanPelaporanController.getAllByPelaporan);
router.get('/:id', penyalahgunaanPelaporanController.getById);
router.post('/', penyalahgunaanPelaporanController.create);
router.patch('/:id', penyalahgunaanPelaporanController.update);
router.delete('/:id', penyalahgunaanPelaporanController.delete);

export default router;