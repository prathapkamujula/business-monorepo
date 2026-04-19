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

/**
 * @swagger
 * /home/offers/{id}:
 *   get:
 *     summary: Returns details for a specific offer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Offer details
 *       404:
 *         description: Offer not found
 *       500:
 *         description: Internal server error
 */
router.get('/offers/:id', homeController.getOfferDetails);

export default router;
