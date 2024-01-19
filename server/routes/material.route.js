import express from 'express';
import MaterialController from '../controllers/material.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', MaterialController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), MaterialController.store);
router.get('/:id', MaterialController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), MaterialController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), MaterialController.destroy);

export default router;