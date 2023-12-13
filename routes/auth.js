import { Router } from 'express';
import { check } from 'express-validator';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Register
// http://localhost:3002/api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').isLength({ min: 6 }),
  ],
  register
);

// Login
// http://localhost:3002/api/auth/login
router.post(
  '/login',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некорректный пароль').exists(),
  ],
  login
);

// Get me
// http://localhost:3002/api/auth/me
router.get('/me', checkAuth, getMe);

export default router;
