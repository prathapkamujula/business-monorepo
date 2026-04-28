import { Router } from 'express';
import { locationIntegrationController } from '../controllers/location-integration.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/resolve-coordinates', authenticate, locationIntegrationController.resolveCoordinates);
router.get('/current-address', authenticate, locationIntegrationController.getCustomerAddress);

export default router;
