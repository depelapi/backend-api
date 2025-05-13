import express from 'express';
import authController from '../controllers/auth-controller';
import auth from '../middlewares/auth';

const router = express.Router();

// Authentication routes
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);

export default router;