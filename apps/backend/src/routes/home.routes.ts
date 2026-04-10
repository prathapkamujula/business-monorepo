import { Router } from 'express';
import { homeController } from '../controllers/home.controller';

const router = Router();

/**
 * @swagger
 * /home/data:
 *   get:
 *     summary: Returns home page data including services, offers, and best sellers
 *     responses:
 *       200:
 *         description: Home page data
 *       500:
 *         description: Internal server error
 */
router.get('/data', homeController.getHomeData);

export default router;
