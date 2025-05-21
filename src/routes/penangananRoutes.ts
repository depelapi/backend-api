import { Router } from 'express';
import { PenangananController } from '../controllers/penangananController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const penangananController = new PenangananController();

router.use(authenticateToken);

// Create new penanganan
router.post('/', penangananController.createPenanganan);

// Update lokasi_gmaps
router.patch('/:id/lokasi', penangananController.updateLokasi);

// Update tiba_pada
router.patch('/:id/tiba', penangananController.updateTibaPada);

// Delete penanganan
router.delete('/:id', penangananController.deletePenanganan);

// Get all penanganan for a pelaporan
router.get('/pelaporan/:id', penangananController.getPenangananForPelaporan);

export default router;