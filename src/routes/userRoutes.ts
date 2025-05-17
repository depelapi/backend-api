import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// Route to get user details
router.get('/:id', authenticateToken, userController.getUserDetails);

// Route to update user details
// router.put('/:id', userController.updateUserDetails);

// Route to delete a user
// router.delete('/:id', userController.deleteUser);

export default router;