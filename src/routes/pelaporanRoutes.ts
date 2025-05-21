import { Router } from 'express';
import { PelaporanController } from '../controllers/pelaporanController';
import { authenticateToken } from '../middleware/authMiddleware';
import { upload } from '../utils/fileUpload';
import { authorizeStatusUpdate } from '../middleware/pelaporanAuthMiddleware';

const router = Router();
const pelaporanController = new PelaporanController();

router.use(authenticateToken);

router.get('/', pelaporanController.getAllPelaporan);
router.get('/:id', pelaporanController.getPelaporanById);
router.post('/', upload.array('images', 5), pelaporanController.createPelaporan); // 5 Images max

router.post('/:id/images', upload.single('image'), pelaporanController.addImageToPelaporan);

router.patch(
  '/:id/status',
  authenticateToken,
  authorizeStatusUpdate,
  pelaporanController.updateStatus
);

export default router;