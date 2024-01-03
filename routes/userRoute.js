import { Router } from 'express';
import {
  updateProfile,
  fetchProfile,
  deleteProfile,
  changePassword,
} from '../controllers/userController.js';
import {
  userValidation,
  passwordValidation,
} from '../validations/userValidation.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Updating user data
// http://localhost:3002/api/auth/user/update
router.post('/update', checkAuth, userValidation, updateProfile);

// getting user data
// http://localhost:3002/api/auth/user/profile
router.get('/profile', checkAuth, fetchProfile);

// Delete user account
// http://localhost:3002/api/auth/user/delete/:userId
router.delete('/delete/:userId', checkAuth, deleteProfile);

// Change password
// http://localhost:3002/api/auth/user/change-password
router.post('/change-password', checkAuth, passwordValidation, changePassword);

export default router;
