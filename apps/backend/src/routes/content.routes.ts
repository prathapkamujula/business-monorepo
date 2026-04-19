import { Router } from 'express';
import contentController from '../controllers/content.controller';

const router = Router();

/**
 * @swagger
 * /content/{pageName}:
 *   get:
 *     summary: Get content for a specific CMS page
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: pageName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the page (e.g., about, privacy)
 *     responses:
 *       200:
 *         description: Page content fetched successfully
 *       404:
 *         description: Page content not found
 *       500:
 *         description: Internal server error
 */
router.get('/:pageName', contentController.getPageContent);

/**
 * @swagger
 * /content:
 *   get:
 *     summary: Get all CMS content records
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: All content records fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', contentController.getAllContent);

export default router;
