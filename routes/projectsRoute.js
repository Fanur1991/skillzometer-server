import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  addProjects,
  fetchProjects,
  deleteProjects,
} from '../controllers/projectsController.js';

const router = new Router();

// Post projects
// http://localhost:3002/api/auth/projects/add
router.post('/add', checkAuth, addProjects);

// Get projects
// http://localhost:3002/api/auth/projects?userId=userId
router.get('/', checkAuth, fetchProjects);

// Delete projects
// http://localhost:3002/api/auth/projects/delete:projectId?userId=userId
router.delete('/delete/:projectId', checkAuth, deleteProjects);

export default router;
