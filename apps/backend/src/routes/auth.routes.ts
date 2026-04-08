import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/google-signin', authController.googleSignin);
router.post('/google-signup', authController.googleSignup);

export default router;
