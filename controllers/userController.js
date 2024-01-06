import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import fs from 'fs';
import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const {
      userId,
      firstname,
      surname,
      githubUrl,
      linkedinUrl,
      websiteUrl,
      avatarUrl,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        surname,
        githubUrl,
        linkedinUrl,
        websiteUrl,
        avatarUrl,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...user } = updatedUser._doc;

    res.json({ user });
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'Отсутствует идентификатор пользователя' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.avatarUrl && fs.existsSync(user.avatarUrl)) {
      fs.unlinkSync(user.avatarUrl);
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json({ message: 'Аккаунт успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении аккаунта:', error);
    res.status(500).json({ message: 'Ошибка при удалении аккаунта' });
  }
};

export const fetchProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const currUser = await User.findById(userId);

    if (!currUser) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...user } = currUser._doc;

    res.json({ user });
  } catch (error) {
    console.error('Ошибка при запросе данных пользователя:', error);
    res.status(500).json({ message: 'Ошибка при запросе данных пользователя' });
  }
};

export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.passwordHash = hashedPassword;
    await user.save();

    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error('Ошибка при смене пароля:', error);
    res.status(500).json({ message: 'Ошибка при смене пароля' });
  }
};
