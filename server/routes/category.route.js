import express from 'express';
import CategoryController from '../controllers/category.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', CategoryController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createAny', 'profile'), CategoryController.store);
router.get('/:id', CategoryController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), CategoryController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteAny', 'profile'), CategoryController.destroy);

export default router;