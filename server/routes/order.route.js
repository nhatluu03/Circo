import express from 'express';
import OrderController from '../controllers/order.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:id', OrderController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createOwn', 'profile'), OrderController.store);
router.get('/:id', userController.allowIfLoggedIn, OrderController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateOwn', 'profile'), OrderController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteOwn', 'profile'), OrderController.destroy);

export default router;