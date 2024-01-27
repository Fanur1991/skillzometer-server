import { Router } from 'express';
import {
  fetchStacks,
  fetchCategories,
  fetchSkills,
} from '../controllers/stacksController.js';

const router = new Router();

//Get stacks from DB
// http://localhost:3002/api/stacks
router.get('/stacks', fetchStacks);

//Get categories from DB
// http://localhost:3002/api/categories
router.get('/categories', fetchCategories);

//Get skills from DB
// http://localhost:3002/api/skills
router.get('/skills', fetchSkills);

export default router;
