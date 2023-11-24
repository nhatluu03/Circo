import express from 'express';
import artworkCollectionController from '../controllers/artworkCollection.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', ArtworkController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), artworkCollectionController.store);
router.get('/:id', ArtworkController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), artworkCollectionController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), artworkCollectionController.destroy);

export default router;