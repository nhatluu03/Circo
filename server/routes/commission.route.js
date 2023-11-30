import express from 'express';
import CommissionController from '../controllers/commission.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', CommissionController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), CommissionController.store);
router.get('/:id', CommissionController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), CommissionController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), CommissionController.destroy);

export default router;