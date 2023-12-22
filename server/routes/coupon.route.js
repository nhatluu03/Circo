import express from 'express';
import CouponController from '../controllers/coupon.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', CouponController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createAny', 'profile'), CouponController.store);
router.get('/:id', CouponController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), CouponController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteAny', 'profile'), CouponController.destroy);

export default router;