import { Router } from 'express';
import * as contentController from '../controllers/contentController';

const router = Router();

router.get('/slides', contentController.getSlides);
router.get('/blog', contentController.getBlogPosts);
router.get('/blog/:id', contentController.getBlogPostById);

export default router;
