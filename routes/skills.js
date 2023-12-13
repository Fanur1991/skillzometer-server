import { Router } from 'express';
import { getSkills } from '../controllers/getSkills.js';

const router = new Router();

//Get skills from DB
// http://localhost:3002/api/skills
router.get('/', getSkills);

export default router;
