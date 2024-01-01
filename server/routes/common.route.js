import express from 'express';
import CommonController from '../controllers/user.controller.js';
const router = express.Router();

router.post('/search', CommonController.search);

export default router;
