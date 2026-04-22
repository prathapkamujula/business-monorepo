import { Router } from 'express';
import { adminAuthController } from '../controllers/admin-auth.controller';
import { adminContentController } from '../controllers/admin-content.controller';
import { adminDashboardController } from '../controllers/admin-dashboard.controller';
import { adminOfferController } from '../controllers/admin-offer.controller';
import { adminProfileController } from '../controllers/admin-profile.controller';
import { adminServiceController } from '../controllers/admin-service.controller';
import { adminAuthenticate } from '../middlewares/admin.middleware';

const router = Router();

// Auth routes
router.post('/login', adminAuthController.login);

// Protected routes
router.use(adminAuthenticate);

// Profile
router.get('/profile', adminProfileController.getProfile);
router.post('/change-password', adminProfileController.changePassword);

// Dashboard
router.get('/dashboard/stats', adminDashboardController.getDashboardStats);

// Content
router.get('/content', adminContentController.getAllContent);
router.put('/content/:id', adminContentController.updateContent);
router.post('/content/save', adminContentController.saveContent);

// Offers
router.get('/offers', adminOfferController.getAllOffers);
router.post('/offers', adminOfferController.createOffer);
router.put('/offers/:id', adminOfferController.updateOffer);

// Services
router.get('/services', adminServiceController.getAllServices);
router.put('/services/:id', adminServiceController.updateService);

export default router;
