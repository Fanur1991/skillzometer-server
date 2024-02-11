import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  // body('password', 'Пароль должен содержать минимум 5 символов').isLength({
  //   min: 5,
  // }),

  body('password')
    .isLength({ min: 5 })
    .withMessage('Пароль должен содержать минимум 5 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      'Пароль должен содержать хотя бы один символ: !@#$%^&*(),.?":{}|<>'
    ),
];

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Неверный пароль').exists(),
];
