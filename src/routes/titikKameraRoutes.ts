import { Router } from 'express';
import { TitikKameraController } from '../controllers/titikKameraController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeOwnerOnly, authorizeOwnerOfCamera } from '../middleware/titikKameraAuthMiddleware';

const router = Router();
const titikKameraController = new TitikKameraController();

router.use(authenticateToken);
router.use(authorizeOwnerOnly);

router.get('/', titikKameraController.getAllCameras);
router.get('/:id', authorizeOwnerOfCamera, titikKameraController.getCameraById);
router.post('/', titikKameraController.createCamera);
router.put('/:id', authorizeOwnerOfCamera, titikKameraController.updateCamera);
router.delete('/:id', authorizeOwnerOfCamera, titikKameraController.deleteCamera);

export default router;