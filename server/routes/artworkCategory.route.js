import express from 'express';
import ArtworkCategoryController from '../controllers/category.controller.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', ArtworkCategoryController.index);
router.post('/', userController.allowIfLoggedIn, userController.grantAccess('createAny', 'profile'), ArtworkCategoryController.store);
router.get('/:id', ArtworkCategoryController.show);
router.put('/:id', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), ArtworkCategoryController.update);
router.delete('/:id', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), ArtworkCategoryController.destroy);

export default router;