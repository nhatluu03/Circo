import express from 'express';
import UserController from '../controllers/user.controller.js';
import {upload} from "../utils/uploadFiles.js";

const router = express.Router();
const uploadMiddleware = upload(".././client/public/uploads/users");

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/:id/feedbacks', UserController.getFeedbacks);
router.get('/:id', UserController.show);
router.get('/', UserController.index);
router.get('/filters', UserController.getTalentsByFilters);
router.put('/:id/editCover', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), uploadMiddleware.single("file"), UserController.editCover);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), UserController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), UserController.destroy);

export default router;