import express from 'express';
import ArtworkController from '../controllers/artwork.controller.js';

const router = express.Router();

router.get('/', ArtworkController.index);
router.post('/', ArtworkController.store);
router.get('/:id', ArtworkController.show);
router.put('/:id', ArtworkController.update);
router.delete('/:id', ArtworkController.destroy);

export default router;