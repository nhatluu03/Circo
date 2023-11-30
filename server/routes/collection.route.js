import express from 'express';
import CollectionController from '../controllers/collection.controller.js'
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', CollectionController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), CollectionController.store);
router.get('/:id', CollectionController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), CollectionController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), CollectionController.destroy);

export default router;