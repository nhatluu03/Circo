import express from 'express';
import CollectionController from '../controllers/collection.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:id', CollectionController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createOwn', 'profile'), CollectionController.store);
router.get('/:id', CollectionController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateOwn', 'profile'), CollectionController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteOwn', 'profile'), CollectionController.destroy);

export default router;