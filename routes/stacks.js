import { Router } from 'express';
import { getStacks } from '../controllers/getStacks.js';

const router = new Router();

//Get stacks from DB
// http://localhost:3002/api/stacks
router.get('/', getStacks);

export default router;
