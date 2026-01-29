import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticateToken, orderController.createOrder);
router.get('/', authenticateToken, orderController.getOrders);
router.get('/:id', authenticateToken, orderController.getOrderById);
router.get('/track/:orderId', orderController.trackOrder);

export default router;
