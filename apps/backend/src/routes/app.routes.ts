import { Router } from 'express';
import { appController } from '../controllers/app.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', appController.getHome);
router.get('/protected', authenticate, appController.getProtected);

export default router;
