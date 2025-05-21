import { Router } from 'express';
import { PenangananController } from '../controllers/penangananController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const penangananController = new PenangananController();

router.use(authenticateToken);

router.post('/', penangananController.createPenanganan);
router.patch('/:id/lokasi', penangananController.updateLokasi);
router.patch('/:id/tiba', penangananController.updateTibaPada);
router.delete('/:id', penangananController.deletePenanganan);
router.get('/pelaporan/:id', penangananController.getPenangananForPelaporan);

export default router;