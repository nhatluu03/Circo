import express from 'express';
import ArtworkController from '../controllers/artwork.controller.js';
import UserController from '../controllers/user.controller.js';
import {upload} from "../utils/uploadFiles.js";

const router = express.Router();
const uploadMiddleware = upload(".././client/public/uploads/artworks");

router.get('/', ArtworkController.index);
router.post('/uploads', UserController.allowIfLoggedIn, uploadMiddleware.array("files"), ArtworkController.uploadImages)
router.post('/upload', UserController.allowIfLoggedIn, uploadMiddleware.single("file"), ArtworkController.uploadImage)
router.post('/', UserController.allowIfLoggedIn, UserController.grantAccess('createOwn', 'profile'), ArtworkController.store);
router.get('/:id', ArtworkController.show);
router.get('/talent/:talentId', ArtworkController.getArtworksByTalentId);
router.put('/:id/comment', UserController.allowIfLoggedIn, ArtworkController.commentOnArtwork);
router.put('/:id/react', UserController.allowIfLoggedIn, ArtworkController.reactOnArtwork);
router.put('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('updateOwn', 'profile'), ArtworkController.update);
router.delete('/:id', UserController.allowIfLoggedIn, UserController.grantAccess('deleteOwn', 'profile'), ArtworkController.destroy);

export default router;