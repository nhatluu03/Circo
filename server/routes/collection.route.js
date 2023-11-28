import express from 'express';
import collectionController from '../controllers/collection.controller.js'
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:artistId', collectionController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createOwn', 'profile'), collectionController.store);
router.get('/:id', collectionController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateOwn', 'profile'), collectionController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteOwn', 'profile'), collectionController.destroy);

export default router;