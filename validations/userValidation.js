import { body } from 'express-validator';

export const userValidation = [
  // body('firstname', 'Имя должно состоять минимум из 2 символов').isLength({
  //   min: 2,
  // }),
  // body('surname', 'Фамилия должна состоять минимум из 2 символов').isLength({
  //   min: 2,
  // }),
  body('githubUrl', 'Ваша ссылка не является URL адресом').optional().isURL(),
  body('linkedinUrl', 'Ваша ссылка не является URL адресом').optional().isURL(),
  body('websiteUrl', 'Ваша ссылка не является URL адресом').optional().isURL(),
];

export const passwordValidation = [
  body('newPassword', 'Пароль должен содержать минимум 5 символов').isLength({
    min: 5,
  }),
];
