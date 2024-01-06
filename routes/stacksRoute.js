import { Router } from 'express';
import {
  getStacks,
  getCategories,
  getSkills,
} from '../controllers/stacksController.js';

const router = new Router();

//Get stacks from DB
// http://localhost:3002/api/stacks
router.get('/stacks', getStacks);

//Get categories from DB
// http://localhost:3002/api/categories
router.get('/categories', getCategories);

//Get skills from DB
// http://localhost:3002/api/skills
router.get('/skills', getSkills);

export default router;
