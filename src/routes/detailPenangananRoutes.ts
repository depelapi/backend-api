import { Router } from 'express';
import { DetailPenangananController } from '../controllers/detailPenangananController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeReguDamkarMember } from '../middleware/detailPenangananAuthMiddleware';

const router = Router();
const detailPenangananController = new DetailPenangananController();

router.get('/penanganan/:penangananId', authenticateToken, detailPenangananController.getAllDetailPenanganan);
router.get('/:id', authenticateToken, detailPenangananController.getDetailPenangananById);
router.get('/pelaporan/:pelaporanId', authenticateToken, detailPenangananController.getAllDetailPenangananForPelaporan);

router.post(
  '/penanganan/:penangananId',
  authenticateToken,
  authorizeReguDamkarMember,
  detailPenangananController.createDetailPenanganan
);
router.put(
  '/:id',
  authenticateToken,
  authorizeReguDamkarMember,
  detailPenangananController.updateDetailPenanganan
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeReguDamkarMember,
  detailPenangananController.deleteDetailPenanganan
);

export default router;