import express from 'express';
import CouponController from '../controllers/coupon.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', CouponController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createAny', 'profile'), CouponController.store);
router.get('/:id', CouponController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), CouponController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), CouponController.destroy);

export default router;