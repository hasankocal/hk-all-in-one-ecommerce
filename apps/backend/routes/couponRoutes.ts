import { Router } from 'express';
import * as couponController from '../controllers/couponController';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/validate', authenticateToken, couponController.validateCoupon);
router.post('/', authenticateToken, isAdmin, couponController.createCoupon); // Only admin

export default router;
