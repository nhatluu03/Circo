import express from 'express';
import CommissionController from '../controllers/commission.controller.js';
import UserController from '../controllers/user.controller.js';
import {upload} from "../utils/uploadFiles.js";

const router = express.Router();
const uploadMiddleware = upload(".././client/public/uploads/commissions");

router.get('/', CommissionController.index);
router.get('/talent/:talentId', CommissionController.getCommissionsByTalentId);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), CommissionController.store);
router.post('/upload', UserController.allowIfLoggedIn, uploadMiddleware.single("file"), CommissionController.uploadImage)
router.get('/:id', CommissionController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), CommissionController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), CommissionController.destroy);

export default router;