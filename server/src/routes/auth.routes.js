import { Router } from 'express';
import { googleLogin, logout } from '../controllers/auth.controller.js';


const router = Router();
router.post('/google', googleLogin);
router.post('/logout', logout);
export default router;