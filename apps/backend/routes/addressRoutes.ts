import { Router } from 'express';
import * as addressController from '../controllers/addressController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, addressController.getAddresses);
router.post('/', authenticateToken, addressController.addAddress);
router.delete('/:id', authenticateToken, addressController.deleteAddress);

export default router;
