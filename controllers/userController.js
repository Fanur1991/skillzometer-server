import { validationResult } from 'express-validator';
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
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Ошибка при обновлении пользователя' });
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
    console.error(error);
    res.status(500).json({ message: 'Ошибка при запросе данных пользователя' });
  }
};
