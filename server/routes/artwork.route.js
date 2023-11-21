import express from 'express';
import ArtworkController from '../controllers/artwork.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', ArtworkController.index);
router.post('/', userController.allowIfLoggedIn, ArtworkController.store);
router.get('/:id', ArtworkController.show);
router.put('/:id', userController.allowIfLoggedIn, ArtworkController.update);
router.delete('/:id', userController.allowIfLoggedIn, ArtworkController.destroy);

export default router;