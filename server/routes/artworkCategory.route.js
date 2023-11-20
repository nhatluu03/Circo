import express from 'express';
import ArtworkCategoryController from '../controllers/category.js';

const router = express.Router();

router.get('/', ArtworkCategoryController.index);
router.post('/', ArtworkCategoryController.store);
router.get('/:id', ArtworkCategoryController.show);
router.put('/:id', ArtworkCategoryController.update);
router.delete('/:id', ArtworkCategoryController.destroy);

export default router;