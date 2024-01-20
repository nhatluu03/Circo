import express from 'express';
import OrderController from '../controllers/order.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/user/order-history/:clientId', OrderController.getOrdersByClientId);
router.get('/user/order-dashboard/:talentId', OrderController.getOrdersByTalentId);
router.get('/', OrderController.index);
// router.post('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), OrderController.store);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), OrderController.store);
router.post('/create-payment-intent', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), OrderController.intent);
router.get('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('readOwn', 'profile'), OrderController.show);
router.put('/:id', UserController.allowIfLoggedIn, OrderController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), OrderController.destroy);

export default router;