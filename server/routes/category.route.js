import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createAny', 'profile'), CategoryController.store);
router.get('/:id', CategoryController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), CategoryController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), CategoryController.destroy);

export default router;