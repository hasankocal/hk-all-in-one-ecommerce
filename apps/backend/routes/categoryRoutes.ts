import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';

const router = Router();

router.get('/', categoryController.getCategories);
router.get('/:seo_url', categoryController.getCategoryBySeoUrl);
router.get('/:seo_url/products', categoryController.getProductsByCategory);
router.post('/', categoryController.createCategory); // Protected route ideally

export default router;
