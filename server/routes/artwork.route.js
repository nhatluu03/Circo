import express from 'express';
import ArtworkController from '../controllers/artwork.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', ArtworkController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess(), ArtworkController.store);
router.get('/:id', ArtworkController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), ArtworkController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteAny', 'profile'), ArtworkController.destroy);

export default router;