import express from 'express';
import ConversationController from '../controllers/conversation.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), ConversationController.store);
router.get('/:id', ConversationController.show);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), ConversationController.destroy);
// router.get('/', ConversationController.index);
// router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), ConversationController.update);

export default router;