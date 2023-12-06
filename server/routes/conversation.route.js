import express from 'express';
import ConversationController from '../controllers/conversation.controller.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', ConversationController.index);
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createAny', 'profile'), ConversationController.store);
router.get('/:id', ConversationController.show);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateAny', 'profile'), ConversationController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteAny', 'profile'), ConversationController.destroy);

export default router;