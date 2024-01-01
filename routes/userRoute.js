import { Router } from 'express';
import { updateProfile, fetchProfile } from '../controllers/userController.js';
import { userValidation } from '../validations/userValidation.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Updating user data
// http://localhost:3002/api/auth/user/update
router.post('/update', userValidation, updateProfile);

// getting user data
// http://localhost:3002/api/auth/user/profile
router.get('/profile', checkAuth, fetchProfile);

export default router;
