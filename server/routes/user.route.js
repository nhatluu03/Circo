import express from 'express';
import UserController from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout)
router.get('/user/:id', UserController.show);
router.get('/users', UserController.allowIfLoggedIn, UserController.grantAccess('readAny', 'profile'), UserController.index);
router.put('/user/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), UserController.update);
router.delete('/user/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteAny', 'profile'), UserController.destroy);

export default router;