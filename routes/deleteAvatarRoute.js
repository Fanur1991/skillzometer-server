import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { deleteAvatar } from '../controllers/deleteAvatar.js';

const router = new Router();

// Delete avatar
// http://localhost:3002/api/auth/delete-avatar
router.post('/delete-avatar', checkAuth, deleteAvatar);
// router.post('/delete-avatar', deleteAvatar);

export default router;
