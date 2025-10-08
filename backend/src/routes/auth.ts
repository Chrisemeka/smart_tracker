import { Router } from 'express';
import { AuthController } from '../controllers/AuthContoller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/verify', AuthController.verify);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

router.get('/google', AuthController.googleAuth);
router.get('/google/callback', AuthController.googleCallback);

export default router;