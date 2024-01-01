import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import { registerValidation, loginValidation } from '../validations/auth.js';

const router = new Router();

// Register
// http://localhost:3002/api/auth/register
router.post(
  '/register',
  // [
  //   check('email', 'Некорректный email').isEmail(),
  //   check('password', 'Некорректный пароль').isLength({ min: 6 }),
  // ],
  registerValidation,
  register
);

// Login
// http://localhost:3002/api/auth/login
router.post(
  '/login',
  // [
  //   check('email', 'Некорректный email').isEmail(),
  //   check('password', 'Некорректный пароль').exists(),
  // ],
  loginValidation,
  login
);

// Get me
// http://localhost:3002/api/auth/me
router.get('/me', checkAuth, getMe);

export default router;
