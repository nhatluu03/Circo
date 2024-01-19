import express from 'express';
import CommonController from '../controllers/common.controller.js';
const router = express.Router();

router.get('/search', CommonController.search);

export default router;
