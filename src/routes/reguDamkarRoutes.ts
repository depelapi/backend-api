import { Router } from 'express';
import { ReguDamkarController } from '../controllers/reguDamkarController';
import { authenticateToken } from '../middleware/authMiddleware';
import { 
  authorizeReguDamkarCreate, 
  authorizeReguDamkarModify, 
  authorizeReguDamkarDelete 
} from '../middleware/reguDamkarAuthMiddleware';

const router = Router();
const reguDamkarController = new ReguDamkarController();

router.get('/', authenticateToken, reguDamkarController.getAllReguDamkar);
router.get('/jenis/:jenisId', authenticateToken, reguDamkarController.getReguDamkarByJenisId);
router.get('/:id', authenticateToken, reguDamkarController.getReguDamkarById);

router.post('/', 
  authenticateToken, 
  authorizeReguDamkarCreate(), 
  reguDamkarController.createReguDamkar
);

router.put('/:id', 
  authenticateToken, 
  authorizeReguDamkarModify('edit'), 
  reguDamkarController.updateReguDamkar
);

router.delete('/:id', 
  authenticateToken, 
  authorizeReguDamkarDelete(), 
  reguDamkarController.deleteReguDamkar
);

export default router;