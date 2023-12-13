import { Router } from 'express';
import { getCategories } from '../controllers/getCategories.js';

const router = new Router();

//Get categories from DB
// http://localhost:3002/api/categories
router.get('/', getCategories);

export default router;
