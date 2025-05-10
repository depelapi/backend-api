import express from 'express';
import authController from '../controllers/auth-controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Authentication routes
router.post('/login', authController.login);
router.post('/logout', auth, authController.logout);

export default router;