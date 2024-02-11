import { body } from 'express-validator';

export const userValidation = [
  // body('firstname', 'Имя должно состоять минимум из 2 символов').isLength({
  //   min: 2,
  // }),
  body('firstname')
    .trim()
    .custom((value) => {
      if (value === '' || value.length >= 2) {
        return true;
      }
      throw new Error('Имя должно состоять минимум из 2 символов');
    }),

  // body('lastname', 'Фамилия должна состоять минимум из 2 символов').isLength({
  //   min: 2,
  // }),
  body('lastname')
    .trim()
    .custom((value) => {
      if (value === '' || value.length >= 2) {
        return true;
      }
      throw new Error('Фамилия должна состоять минимум из 2 символов');
    }),
  body('githubUrl', 'Ваша ссылка не является URL адресом')
    .optional({ checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Ваша ссылка не является URL адресом'),
  body('linkedinUrl', 'Ваша ссылка не является URL адресом')
    .optional({ checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Ваша ссылка не является URL адресом'),
  body('websiteUrl', 'Ваша ссылка не является URL адресом')
    .optional({ checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Ваша ссылка не является URL адресом'),
];

export const passwordValidation = [
  // body('newPassword')
  // .isLength({
  //   min: 5,
  // })
  // .withMessage('Пароль должен содержать минимум 5 символов'),
  body('newPassword')
    .isLength({ min: 5 })
    .withMessage('Пароль должен содержать минимум 5 символов')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage(
      'Пароль должен содержать хотя бы один символ: !@#$%^&*(),.?":{}|<>'
    ),
];
