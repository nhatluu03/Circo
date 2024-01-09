import express from 'express';
import FieldController from '../controllers/field.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', FieldController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createAny', 'profile'), FieldController.store);
router.get('/:id', FieldController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), FieldController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteAny', 'profile'), FieldController.destroy);

export default router;