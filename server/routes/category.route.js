import express from 'express';
import categoryController from '../controllers/category.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', categoryController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createAny', 'profile'), categoryController.store);
router.get('/:id', categoryController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), categoryController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), categoryController.destroy);

export default router;