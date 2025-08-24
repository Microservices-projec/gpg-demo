import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { whoAmI, getData, updateData } from '../controllers/userData.controller.js';

const router = Router();

// Update these routes to be more specific
router.get('/profile', authMiddleware, whoAmI);
router.get('/data', authMiddleware, getData);
router.post('/data', authMiddleware, updateData);

export default router;