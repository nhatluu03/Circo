import express from 'express';
import TodoController from '../controllers/todo.controller.js';

const router = express.Router();

router.get('/', TodoController.index);
router.post('/',TodoController.store);

export default router;