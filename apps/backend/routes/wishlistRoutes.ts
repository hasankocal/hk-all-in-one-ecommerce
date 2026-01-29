import { Router } from 'express';
import * as wishlistController from '../controllers/wishlistController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, wishlistController.getWishlist);
router.post('/toggle', authenticateToken, wishlistController.toggleWishlist);

export default router;
